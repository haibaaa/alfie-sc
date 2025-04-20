import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/main(.*)']);
const isAuthPage = createRouteMatcher(['/auth/sign-in(.*)', '/auth/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/main/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json)).*)',
    '/(api|trpc)(.*)',
  ],
};
