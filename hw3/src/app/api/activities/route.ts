import { NextResponse, type NextRequest } from "next/server";

import {  z } from "zod";

import { db } from "@/db";
import { actTable } from "@/db/schema";
import { like } from "drizzle-orm";

// zod is a library that helps us validate data at runtime
// it's useful for validating data coming from the client,
// since typescript only validates data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/
const postTweetRequestSchema = z.object({
  handle: z.string(),
  title: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type PostTweetRequest = z.infer<typeof postTweetRequestSchema>;

// This API handler file would be trigger by http requests to /api/likes
// POST requests would be handled by the POST function
// GET requests would be handled by the GET function
// etc.
// read more about Next.js API routes here:
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export async function POST(request: NextRequest) {
  const data = await request.json();
  

  try {
    // parse will throw an error if the data doesn't match the schema
    postTweetRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Now we can safely use the data from the request body
  // the `as` keyword is a type assertion, this tells typescript
  // that we know what we're doing and that the data is of type LikeTweetRequest.
  // This is safe now because we've already validated the data with zod.
  const { handle, title, start_date, end_date } = data as PostTweetRequest;

  console.log(handle)
  try {
    // This piece of code runs the following SQL query:
    // INSERT INTO tweets (
    //  user_handle,
    //  content,
    //  reply_to_tweet_id
    // ) VALUES (
    //  {handle},
    //  {content},
    //  {replyToTweetId}
    // )
    await db
      .insert(actTable)
      .values({
        title ,
        userHandle: handle,
        
        start_date,
        end_date,
      })
      .execute();
  } catch (error) {
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}


const searchSchema = z.object({
  title: z.string()
});

export async function GET(request: NextRequest) {
  const searchparams = await request.nextUrl.searchParams;

  const title = searchparams.get('title')
  
  
  // Now we can safely use the data from the request body
  // the `as` keyword is a type assertion, this tells typescript
  // that we know what we're doing and that the data is of type LikeTweetRequest.
  // This is safe now because we've already validated the data with zod.
  
  if(!title)
  {
    return;
  }
  try {
    // This is a common pattern to check if a row exists
    // if the query returns a row with a dummy column of value 1
    // then the row which satisfies the condition exists.
    // You can also select any column here, but since we don't need
    // any of those data, we just select a dummy column of constant value 1,
    // this saves us from copying any data from the disk to the memory.
    //
    // You can also do this with count(*) and check if the count is greater than 0.
    searchSchema.parse({ title })
    
    const results = await db
      .select(({
        title:actTable.title,
        
        }))
      .from(actTable)
      .where(like(actTable.title, `%${title}%`))
      .execute();
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json({ results}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
