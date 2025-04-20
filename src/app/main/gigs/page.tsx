/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

import { getGigsWithFreelancer } from '~/app/actions/gigs';
import { GigsTop, GigMenubar } from './_components/gigs-top';
import { GigList } from './_components/gigs-list';

export default async function GigsPage() {
  const gigs = await getGigsWithFreelancer();

  return (
    <div className="p-6 space-y-6">
      {/* <GigsTop />
      <GigMenubar /> */}
      <GigList gigs={gigs} />
    </div>
  );
}
