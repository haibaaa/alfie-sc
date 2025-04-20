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

"use client";

import { Menu } from "lucide-react";
import { AppSidebar } from "~/components/app-sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen">
      {sidebarOpen && <AppSidebar />}
      
      <main className="flex-1">
        <div className="p-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md mb-4 bg-background hover:bg-accent"
          >
            <Menu className="h-4 w-4" />
          </button>
          {children}
        </div>
      </main>
    </div>
  );
}