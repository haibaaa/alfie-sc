'use client';

import { useRouter } from 'next/navigation';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar"


export function GigMenubar() {
  const router = useRouter();

  return (
    <Menubar className="bg-white text-black border-red/10 rounded-none px-6 py-2 gap-4">
      <MenubarMenu>
        <MenubarTrigger onClick={() => router.push('/main/gigs')} className="cursor-pointer">
          Browse Gigs
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => router.push('/main/your-gigs')} className="cursor-pointer">
          Your Gigs
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>

    

  );
}

export function GigsTop() {
    return (
      <div className="text-black text-2xl font-semibold mb-6">
        🎯 Gigs Marketplace
      </div>

    );
  }
  
