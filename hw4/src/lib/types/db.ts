import { TimestampFsp } from "drizzle-orm/mysql-core"; // eslint-disable-line

export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Document = {
  id: string;
  title: string;
  publication: string;
};
export type Chat = {
  id: number;
  content: string;
  useeId: string;
  display_id: string;
  createdAt: TimestampFsp;
};
