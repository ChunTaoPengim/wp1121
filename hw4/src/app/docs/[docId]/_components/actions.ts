import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToDocumentsTable, chatsTable, documentsTable } from "@/db/schema";

export async function getDocumentAuthors(docId: string) {
  const dbAuthors = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.documentId, docId),
    with: {
      user: {
        columns: {
          displayId: true,
          username: true,
          email: true,
        },
      },
    },
    columns: {},
  });

  const authors = dbAuthors.map((dbAuthor) => {
    const author = dbAuthor.user;
    return {
      id: author.displayId,
      username: author.username,
      email: author.email,
    };
  });

  return authors;
}

export const addDocumentAuthor = async (docId: string, email: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!user) {
    return false;
  }

  await db.insert(usersToDocumentsTable).values({
    documentId: docId,
    userId: user.displayId,
  });
};

export const addchats = async (docId: string, useId: string, input:string) => {
    // Find the user by email
    "use server";
    const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.displayId, useId));
    if (!user) {
        return false;
    }
    await db.insert(chatsTable).values({
        content: input,
      userId: useId,
      docId: docId,
    });
  };
  export const getchats = async (docId: string) => {
    // Find the user by email
    "use server";
    const chats = await db
    .select({
        content: chatsTable.content,
        userId: chatsTable.userId,
        id: chatsTable.id,
        docId: chatsTable.docId,
        }).from(chatsTable)
        .where(eq(chatsTable.docId, docId))
        .orderBy(chatsTable.createdAt)
        .execute();
    return chats;
  };

  export const deleteChat = async (chatID: number) => {
    "use server";
    console.log("deleteChat");
    await db
      .delete(chatsTable)
      .where(eq(chatsTable.id, chatID));
    return;
};
  export const getEmails = async (userId: string) => {
    // Find the user by email
    "use server";
    const emails = await db
    .select({
        email: usersTable.email,
        }).from(usersTable)
        .where(eq(usersTable.displayId, userId))
        .execute();
    return emails;
  };
  export const getUsername = async (userId: string) => {
    // Find the user by email
    "use server";
    const names = await db
    .select({
        name: usersTable.username,
        }).from(usersTable)
        .where(eq(usersTable.displayId, userId))
        .execute();
    return names;
  };
  export const getPublication = async (docId: string) => {
    // Find the user by email
    "use server";
    const publication = await db
    .select({
        publication: documentsTable.publication,
        }).from(documentsTable)
        .where(eq(documentsTable.displayId, docId))
        .execute();
    return publication;
  };
  export const updatePublication = async (docId: string, new_public:string) => {
    // Find the user by email
    "use server";
    await db
    .update(documentsTable)
    .set({publication :new_public})
    .where(eq(documentsTable.displayId, docId))
    .execute()
    
    return ;
  };

  
