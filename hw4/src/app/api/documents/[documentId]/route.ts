import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
// import { and, eq } from "drizzle-orm";
// import Pusher from "pusher";

import { db } from "@/db";
import {  chatsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
const chatschema = z.object({
    content: z.string(),
    userId: z.string(),
    docId : z.string(),
});
type chatrequest = z.infer<typeof chatschema>;
export async function POST(
    request: NextRequest) {
        const data = await request.json();
        try {
            chatschema.parse(data);
          } catch (error) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
          }
        const { content, userId, docId } = data as chatrequest;
  
        try {
            await db
              .insert(chatsTable)
              .values({
                content,
                userId,
                docId
              })
              .onConflictDoNothing()
              .execute();
          } catch (error) {
            return NextResponse.json(
              { error: "Something went wrong" },
              { status: 500 },
            );
          }
        
          return new NextResponse("OK", { status: 200 });
      
  }