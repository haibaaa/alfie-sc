import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <span className="text-white text-xl">alfie</span>
      
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
