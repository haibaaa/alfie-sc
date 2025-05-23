import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const { userId } = await auth();

  // Redirect signed-in users to the dashboard
  if (userId) {
    redirect("/main/dashboard");
  }

  return <SignUp path="/auth/sign-up" routing="path" />;
}
