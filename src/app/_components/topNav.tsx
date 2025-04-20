/* eslint-disable @next/next/no-img-element */
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
      <div className="h-full flex items-center">
        <SignInButton />
      </div>
    </SignedOut>

  <SignedIn>
    <div className="h-full flex items-center">
      <div className="h-full flex items-center scale-125">
        <UserButton />
      </div>
    </div>
  </SignedIn>


  </div>
</nav>

  );
}


      // {/* Top Nav Bar */}
      // <nav className="bg-card shadow-md px-6 py-4 flex justify-between items-center border-b border-border">
      //   <div className="text-2xl font-bold text-primary">YourApp</div>
      //   <div className="space-x-4 text-sm sm:text-base">
      //     <Link href="/messageUI" className="text-primary hover:text-primary/90 hover:underline">
      //       💬 Messages
      //     </Link>
      //     <Link href="/reviewUI" className="text-primary hover:text-primary/90 hover:underline">
      //       📝 Reviews
      //     </Link>
      //     <Link href="/disputeUI" className="text-destructive hover:text-destructive/90 hover:underline">
      //       🛠️ Disputes
      //     </Link>
      //   </div>
      // </nav>

      {/* Top Nav Bar
      <nav className="bg-[#1c1c1c] shadow-md px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl font-bold text-[#6ec8b9]">YourApp</div>
        <div className="space-x-4 text-sm sm:text-base">
          <Link href="/messageUI" className="text-[#6ec8b9] hover:text-[#6ec8b9]/80 hover:underline">
            Messages
          </Link>
          <Link href="/reviewUI" className="text-[#6ec8b9] hover:text-[#6ec8b9]/80 hover:underline">
            Reviews
          </Link>
          <Link href="/disputeUI" className="text-[#b46664] hover:text-[#b46664]/80 hover:underline">
            Disputes
          </Link>
        </div>
      </nav> */}