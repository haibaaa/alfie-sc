import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany()
  console.log(posts);

  return (
    <main className="">
      <div>
        hi
      </div>
    </main>
  );
}
