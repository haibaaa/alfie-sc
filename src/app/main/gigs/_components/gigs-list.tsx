'use client';

import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Clock, DollarSign, Briefcase } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

type Gig = {
  gigId: number;
  title: string;
  description: string;
  price: string;
  category: string;
  deliveryTime: number;
  freelancer: {
    id: number;
    name: string;
  };
};

export function GigList({ gigs }: { gigs: Gig[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {gigs.map((gig) => (
        <Card
          key={gig.gigId}
          className="rounded-xl bg-[#1c1c1c] border-0 text-white hover:bg-[#252525] transition-colors overflow-hidden"
        >
          <CardHeader className="px-4">
            <div className="text-base font-normal text-gray-400">{gig.title}</div>
          </CardHeader>
          
          <CardContent className="p-3 pt-0 space-y-1 text-sm">
            <p className="text-gray-400 text-xs line-clamp-2">
              {gig.description}
            </p>
            
            <div className="flex justify-between gap-2 pt-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="border-gray-700 text-white flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{gig.category}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Category</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="border-gray-700 text-white flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{gig.deliveryTime}d</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delivery Time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Badge className="bg-green-500 hover:bg-green-600 text-black flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{gig.price}</span>
            </Badge>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 bg-gray-800">
                <AvatarImage src={`/avatars/${gig.freelancer.id}.png`} alt={gig.freelancer.name} />
                <AvatarFallback className="bg-gray-800 text-white text-xs">
                  {gig.freelancer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-300">{gig.freelancer.name}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}