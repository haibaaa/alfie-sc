// import { Card, CardContent } from "~/components/ui/card";
// import { cn } from "~/lib/utils";
// import type { LucideIcon } from "lucide-react";

// interface DashboardCardProps {
//   title: string;
//   value: string;
//   description: string;
//   icon?: LucideIcon;
//   className?: string;
// }

// export default function DashboardCard({
//   title,
//   value,
//   description,
//   icon: Icon,
//   className,
// }: DashboardCardProps) {
//   return (
//     <Card className={cn("bg-neutral-900 text-white", className)}>
//       <CardContent className="p-2"> {/* Reduced padding to decrease height */}
//         <div className="flex items-center gap-4">
//           {Icon && <Icon className="text-white w-6 h-6" />}
//           <div>
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <p className="text-green-500 text-2xl font-bold">{value}</p>
//             <p className="text-sm text-neutral-400">{description}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
