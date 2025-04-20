import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import CreateUserForm from "./create/CreateUserForm"; // the UI-only part
import { eq } from 'drizzle-orm';
import { users } from "~/server/db/schema";

export default async function CreateUserPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  
  const account = await db.select().from(users).where(eq(users.userHash, userId)).limit(1);
  if (account.length > 0) redirect('/main/dashboard');

  return <CreateUserForm />;
}
