import { eq, sql , asc} from "drizzle-orm";
import SwitchUser from "@/components/SwitchUser"
import NameDialog from "@/components/NameDialog";
import { db } from "@/db";
import { actTable, joinsTable, usersTable } from "@/db/schema";
import ActivityInput from "@/components/ActivityInput";
import Act from "@/components/Act";
import SearchBar from "@/components/SearchBar";

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
  };
};
export default async function Home({
  searchParams: { username, handle },
}: HomePageProps) {

  if (username && handle) {
    await db
      .insert(usersTable)
      .values({
        displayName: username,
        handle,
      })
      // Since handle is a unique column, we need to handle the case
      // where the user already exists. We can do this with onConflictDoUpdate
      // If the user already exists, we just update the display name
      // This way we don't have to worry about checking if the user exists
      // before inserting them.
      .onConflictDoUpdate({
        target: usersTable.handle,
        set: {
          displayName: username,
        },
      })
      .execute();
  }

  const likesSubquery = db.$with("join_count").as(
    db
      .select({
        actId: joinsTable.actId,
        // some times we need to do some custom logic in sql
        // although drizzle-orm is very powerful, it doesn't support every possible
        // SQL query. In these cases, we can use the sql template literal tag
        // to write raw SQL queries.
        // read more about it here: https://orm.drizzle.team/docs/sql
        joins: sql<number | null>`count(*)`.mapWith(Number).as("joins"),
      })
      .from(joinsTable)
      .groupBy(joinsTable.actId),
  );

  // This subquery generates the following SQL:
  // WITH liked AS (
  //  SELECT
  //   tweet_id,
  //   1 AS liked
  //   FROM likes
  //   WHERE user_handle = {handle}
  //  )
  const likedSubquery = db.$with("joined").as(
    db
      .select({
        actId: joinsTable.actId,
        // this is a way to make a boolean column (kind of) in SQL
        // so when this column is joined with the tweets table, we will
        // get a constant 1 if the user liked the tweet, and null otherwise
        // we can then use the mapWith(Boolean) function to convert the
        // constant 1 to true, and null to false
        joined: sql<number>`1`.mapWith(Boolean).as("joined"),
      })
      .from(joinsTable)
      .where(eq(joinsTable.userHandle, handle ?? "")),
  );

  
  const acts = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: actTable.id,
      title: actTable.title,
      username: usersTable.displayName,
      handle: actTable.userHandle,
      joins: likesSubquery.joins,
      start_date: actTable.start_date,
      end_date: actTable.end_date,
      joined: likedSubquery.joined,
    })
    .from(actTable)
    .orderBy(asc(actTable.createdAt))
    // JOIN is by far the most powerful feature of relational databases
    // it allows us to combine data from multiple tables into a single query
    // read more about it here: https://orm.drizzle.team/docs/select#join
    // or watch this video:
    // https://planetscale.com/learn/courses/mysql-for-developers/queries/an-overview-of-joins
    .innerJoin(usersTable, eq(actTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(actTable.id, likesSubquery.actId))
    .leftJoin(likedSubquery, eq(actTable.id, likedSubquery.actId))
    .execute();
  
  
    return (
      <>
        <div >
          使用者: {username} 
          <SwitchUser />
        </div>
        <ActivityInput />
        {acts.map((act) => (
          <Act   
            key={act.id}
            id={act.id}
            username={username}
            handle={handle}
            authorName={act.username}
            authorHandle={act.handle}
            title={act.title}
            joins={act.joins}
            joined={act.joined}
            start_date={act.start_date!}
            end_date={act.end_date!}/>
        ))}
        <SearchBar />
        
        <NameDialog />
        
      </>
    )
  }
  