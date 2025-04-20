'use client';
import type { Dispute } from './mockData';

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 space-y-2">
      <div className="text-sm text-gray-500">
        Dispute ID: <span className="font-medium">{dispute.disputeId}</span> | Order: <span className="font-medium">{dispute.orderId}</span>
      </div>
      <p className="text-gray-800">{dispute.description}</p>
      <div className="text-xs text-gray-600">
        Complainant: {dispute.complainantId} | Respondent: {dispute.respondentId}
      </div>
      <div className="text-xs text-gray-400">Created: {new Date(dispute.createdAt).toLocaleString()}</div>
    </div>
  );
}
