import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import CreateUserForm from "./create/CreateUserForm"; // UI component for user creation
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export default async function CreateUserPage() {
  const { userId } = await auth();

  // Redirect to sign-in if the user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if the user already exists in the database
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.userHash, userId))
    .limit(1);

  if (existingUser.length > 0) {
    // Redirect to dashboard if the user already exists
    redirect("/main/dashboard");
  }

  // Render the user creation form
  return <CreateUserForm />;
}
