'use client';
import { useEffect, useState } from 'react';
import type { Dispute } from './mockData';
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { User, Clock } from "lucide-react";

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // Only format the date on the client side
    const date = dispute.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setFormattedDate(date);
  }, [dispute.createdAt]);

  // If formattedDate is still null (before client-side rendering), show a loading indicator or empty string
  if (formattedDate === null) {
    return (
      <Card className="bg-[#1c1c1c] border-0 text-white hover:bg-[#252525] transition-colors overflow-hidden">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Dispute ID: <span className="font-medium text-white">{dispute.disputeId}</span>
            </div>
            <Badge variant="outline" className="border-gray-700 text-white flex items-center gap-1">
              Order: {dispute.orderId}
            </Badge>
          </div>
          
          <p className="text-gray-300">{dispute.description}</p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <User className="h-3 w-3" />
              <span>Complainant: {dispute.complainantId}</span>
              <span className="mx-1">|</span>
              <span>Respondent: {dispute.respondentId}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>Loading...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1c1c1c] border-0 text-white hover:bg-[#252525] transition-colors overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Dispute ID: <span className="font-medium text-white">{dispute.disputeId}</span>
          </div>
          <Badge variant="outline" className="border-gray-700 text-white flex items-center gap-1">
            Order: {dispute.orderId}
          </Badge>
        </div>
        
        <p className="text-gray-300">{dispute.description}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <User className="h-3 w-3" />
            <span>Complainant: {dispute.complainantId}</span>
            <span className="mx-1">|</span>
            <span>Respondent: {dispute.respondentId}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}