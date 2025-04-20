// // app/api/create-user/route.ts
// import { upsertUser } from '../../../server/db/users';
//  // Adjust if your path is different

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     await upsertUser({
//       firstName: body.firstName,
//       lastName: body.lastName,
//       bio: body.bio,
//       profilePictureUrl: body.profilePicture,
//       email: body.email,
//       accType: body.accType,
//     });

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error('[API ERROR]', error);
//     return new Response(JSON.stringify({ success: false, message: 'Failed to save user' }), { status: 500 });
//   }
// }


import { upsertUser } from '../../../server/db/users';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🔥 Incoming body:', body);

    const result = await upsertUser({
      firstName: body.firstName,
      lastName: body.lastName,
      bio: body.bio,
      profilePictureUrl: body.profilePicture,
      email: body.email,
      accType: body.accType,
    });
    console.log('✅ upsertUser success:', result);
    

    

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('❌ API ERROR:', error?.message || error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || 'Unknown error' }),
      { status: 500 }
    );
  }
}
