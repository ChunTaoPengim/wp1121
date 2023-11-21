import { relations, sql } from "drizzle-orm";
import {
  index,
  // text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  timestamp,
  // integer,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
}));

export const documentsTable = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    publication: varchar("publication", { length: 100 }).default("Publication"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const documentsRelations = relations(documentsTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
}));

export const usersToDocumentsTable = pgTable(
  "users_to_documents",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documentsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_document_index").on(
      table.userId,
      table.documentId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.documentId, table.userId),
  }),
);

export const usersToDocumentsRelations = relations(
  usersToDocumentsTable,
  ({ one }) => ({
    document: one(documentsTable, {
      fields: [usersToDocumentsTable.documentId],
      references: [documentsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToDocumentsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const chatsTable = pgTable(
  "chats",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 280 }).notNull(),
    userId : varchar("user_id").notNull(),
    docId: uuid("display_id").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    userUsernameIndex: index("user_username_index").on(table.userId),
    createdAtIndex: index("created_at_index").on(table.createdAt),
  }),
);