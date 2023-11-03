import { db } from "@/db";
import { usersTable, chatTable } from "@/db/schema";
import { eq, asc, isNull, sql } from "drizzle-orm";
import ChatInput from "@/components/ChatInput";
import Chat from "@/components/Chat";

type ChatPageProps = {
    params: {
      // this came from the file name: [tweet_id].tsx
      actID: string;

    };
    searchParams: {
      // this came from the query string: ?username=madmaxieee
        joined?: boolean;
        title?: string;
        handle:string;
    };
  };

  import React from 'react'
  

  export default async function ChatPage({
    params: { actID},
    searchParams: { joined, title , handle},
  }: ChatPageProps){

    const actId = parseInt(actID);

    const chats = await db
    .select({
      content:chatTable.content,
      handle:chatTable.userHandle,
      username:usersTable.displayName,
    }).from(chatTable)
    .where(eq(chatTable.actId, actId))
    .orderBy(asc(chatTable.createdAt))
    .innerJoin(usersTable, eq(chatTable.userHandle, usersTable.handle))
    .execute()


    return (
      <>
      {joined?<ChatInput handle={handle} actId={actId}/>:<div>未參加活動</div>}
       {/* <ChatInput handle={handle} actId={actId}/> */}
        {chats.map((act) => (
          <Chat username={act.username} content={act.content}/>
        ))}
      </>
      
    )
  }
  
 