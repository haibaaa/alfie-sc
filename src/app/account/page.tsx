import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import CreateUserForm from "./create/CreateUserForm"; // the UI-only part

export default async function CreateUserPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const account = await db.users.findUnique({
    where: { userHash: userId }, // Use userHash instead of userId
  });

  if (account) redirect("/dashboard"); // or wherever

  return <CreateUserForm />;
}
