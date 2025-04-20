/* eslint-disable @next/next/no-img-element */
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from "~/components/ui/button";

export default function TopNav() {
  return (
    <nav className="bg-[#00A63E] h-16 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 h-full">
        <img
          src="/grelf2.png"
          alt="Logo"
          className="h-full object-contain"
        />
      </div>

      <div className="flex items-center space-x-4 h-full">
        <SignedOut>
          <SignInButton mode="redirect">
            <Button
              variant="outline"
              className="border-[#141414] text-[#141414] hover:bg-green-500/10 px-8 py-6"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <Button
              variant="outline"
              className="border-[#141414] text-[#141414] hover:bg-white/10 px-8 py-6"
            >
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <div className="h-full flex items-center scale-125">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
