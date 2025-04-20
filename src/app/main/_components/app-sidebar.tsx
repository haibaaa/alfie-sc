// "use client";

// import { Activity, MessageSquare, Briefcase, AlertTriangle } from "lucide-react"
 
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "~/components/ui/sidebar"

// // Navigation items
// const navigationItems = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: Activity,
//   },
//   {
//     title: "Messages",
//     url: "/messages",
//     icon: MessageSquare,
//   },
//   {
//     title: "Gigs",
//     url: "/gigs",
//     icon: Briefcase,
//   },
//   {
//     title: "Disputes",
//     url: "/disputes",
//     icon: AlertTriangle,
//   },
// ]
 
// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader className="flex items-center h-14 border-b px-4">
//         <span className="text-lg font-semibold">MyApp</span>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url} className="flex items-center gap-3">
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }

// src/components/ui/AppSidebar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  MessageSquare,
  Briefcase,
  AlertTriangle,
  Menu,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  { title: "Dashboard", href: "/main/dashboard", icon: Activity },
  { title: "Messages", href: "/main/messages", icon: MessageSquare },
  { title: "Gigs", href: "/main/gigs", icon: Briefcase },
  { title: "Orders", href: "/main/orders", icon: ShoppingCart },
  { title: "Disputes", href: "/main/disputes", icon: AlertTriangle },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarVariants = {
    open: {
      width: 250,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    closed: {
      width: 64,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex-shrink-0"
    >
      <motion.div
        initial="open"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="h-screen bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)] border-r border-[var(--color-sidebar-border)] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 h-14 border-b border-[var(--color-sidebar-border)] flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.span
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold"
              >

              </motion.span>
            )}
          </AnimatePresence>

          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {/* Nav content */}
        <div className="flex-1 overflow-auto p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.h3
                key="nav-label"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium mb-2"
              >
                Navigation
              </motion.h3>
            )}
          </AnimatePresence>

          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--color-sidebar-accent)] hover:text-[var(--color-sidebar-accent-foreground)] transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.span
                      key={item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.aside>
  );
}
