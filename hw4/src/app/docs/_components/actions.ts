import { eq, desc, or } from "drizzle-orm";

import { db } from "@/db";
import { documentsTable, usersToDocumentsTable , usersTable, chatsTable} from "@/db/schema";
// import { title } from "process";

export const createDocument = async (userId: string) => {
  "use server";
  console.log("[createDocument]");

  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: "New Document",
      })
      .returning();
    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
    });
    return newDoc.displayId;
  });
  return newDocId;
};

export const getDocuments = async (userId: string) => {
  "use server";
  const documents = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.userId, userId),
    with: {
      document: {
        columns: {
          displayId: true,
          title: true,
        },
      },
    },
  });

  const documentsWithLastChat = await Promise.all(
    documents.map(async (doc) => {
      const lastChat = await db
        .select({
          created: chatsTable.createdAt,
          content: chatsTable.content,
        })
        .from(chatsTable)
        .where(eq(chatsTable.docId, doc.document.displayId))
        .orderBy(desc(chatsTable.createdAt))
        .limit(1)
        

      return {
        ...doc,
        lastChat,
      };
    })
  );

  return documentsWithLastChat;


  

  
  // return documents;
};

export const deleteDocument = async (documentId: string) => {
    "use server";
    console.log("[deleteDocument]");
    await db
      .delete(documentsTable)
      .where(eq(documentsTable.displayId, documentId));
    await db
      .delete(chatsTable)
      .where(eq(chatsTable.docId, documentId));

    return;

};

export const getUsers = async () => {
    "use server";
  
    const users = await db
    .select({
        username: usersTable.username,
        email: usersTable.email,
        userId: usersTable.displayId}).from(usersTable).execute();
    return users;
};
export const createDocumentWithOthers = async (username: string, userId: string, user1Id: string, user1name: string) => {
  "use server";
  console.log("[createDocument with others]");

  const existingDoc = await db.select({title: documentsTable.title}).from(documentsTable)
    .where(or(eq(documentsTable.title, `${username} with ${user1name}`), eq(documentsTable.title, `${user1name} with ${username}`) ))
    .execute()
  if(existingDoc[0]){
    return 0;
  }

    
    
  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: `${username} with ${user1name}`,
      })
      .returning();
    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
    });
    await tx.insert(usersToDocumentsTable).values({
      userId: user1Id,
      documentId: newDoc.displayId,
    });
    return newDoc.displayId;
  });
  return newDocId;
};

// export const findlastChat = async (docId: string) => {
//   "use server";

//     const chat = await db
//     .select({
//         created: chatsTable.createdAt,
//         content: chatsTable.content,
//        }).from(chatsTable)
//        .orderBy(desc(chatsTable.createdAt)) // Order by createdAt in descending order
//        .limit(1) // Limit the result to one row
//        .execute();
//     return chat;
// };
