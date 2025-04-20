'use client';
import { useEffect, useState } from 'react';
import type { Dispute } from './mockData';

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
      <div className="bg-white shadow rounded-xl p-4 space-y-2">
        <div className="text-sm text-gray-500">
          Dispute ID: <span className="font-medium">{dispute.disputeId}</span> | Order: <span className="font-medium">{dispute.orderId}</span>
        </div>
        <p className="text-gray-800">{dispute.description}</p>
        <div className="text-xs text-gray-600">
          Complainant: {dispute.complainantId} | Respondent: {dispute.respondentId}
        </div>
        <div className="text-xs text-gray-400">Created: Loading...</div> {/* Fallback during SSR mismatch */}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-4 space-y-2">
      <div className="text-sm text-gray-500">
        Dispute ID: <span className="font-medium">{dispute.disputeId}</span> | Order: <span className="font-medium">{dispute.orderId}</span>
      </div>
      <p className="text-gray-800">{dispute.description}</p>
      <div className="text-xs text-gray-600">
        Complainant: {dispute.complainantId} | Respondent: {dispute.respondentId}
      </div>
      <div className="text-xs text-gray-400">Created: {formattedDate}</div> {/* Display formatted date */}
    </div>
  );
}
