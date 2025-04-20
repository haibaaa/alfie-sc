//'use client';

// import { GigsTop, GigMenubar } from './_components/gigs-top';
//  // adjust import path as needed

// export default function GigsPage() {
//   return (
//     <div>
//       <GigsTop />
//       <GigMenubar />
//       {/* You can add gig cards/list below here */}
//     </div>
//   );
// }

// src/app/main/gigs/page.tsx (✅ SERVER COMPONENT)
import { getGigsWithFreelancer } from '~/app/actions/gigs';
import { GigsTop, GigMenubar } from './_components/gigs-top';
import { GigList } from './_components/gigs-list'; // ⬅️ we'll create this

export default async function GigsPage() {
  const gigs = await getGigsWithFreelancer();

  return (
    <div className="p-6">
      <GigsTop />
      <GigMenubar />
      <GigList gigs={gigs} /> {/* ✅ Pass gigs to a client-rendered component */}
    </div>
  );
}
