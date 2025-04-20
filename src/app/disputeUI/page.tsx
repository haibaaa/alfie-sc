'use client';

import { mockDisputes } from './mockData';
import DisputeCard from './DisputeCard';
import DisputeForm from './DisputeForm';

export default function DisputePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-red-600">Dispute Center</h1>

      <section className="space-y-4">
        {mockDisputes.map((dispute) => (
          <DisputeCard key={dispute.disputeId} dispute={dispute} />
        ))}
      </section>

      <hr className="my-6" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">File a New Dispute</h2>
        <DisputeForm />
      </section>
    </div>
  );
}
