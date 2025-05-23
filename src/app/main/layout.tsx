// "use client";

// import { Menu } from "lucide-react";
// import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
// import { AppSidebar } from "~/components/app-sidebar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <AppSidebar />
//         <main className="flex-1">
//           <div className="p-4">
//             <SidebarTrigger className="inline-flex items-center justify-center w-10 h-10 rounded-md mb-4">
//               <Menu className="h-4 w-4" />
//             </SidebarTrigger>
//             {children}
//           </div>
//         </main>
//       </div>
//     </SidebarProvider>
//   )
// }

// src/app/main/layout.tsx

"use client";

import { AppSidebar } from "~/app/main/_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#141414] text-white">
      <AppSidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
