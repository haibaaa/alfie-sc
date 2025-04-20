// app/disputes/page.tsx
import DisputeCard from './DisputeCard';
import DisputeForm from './DisputeForm';
import { db } from '../../../server/db/index'; // Adjust path if needed
import { disputes } from '../../../server/db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import type { Dispute } from './mockData'; // Your Dispute type

export default async function DisputePage() {
  // Fetch disputes data from the database
  const disputesData: InferSelectModel<typeof disputes>[] = await db.select().from(disputes);

  // Convert `createdAt` to Date if it's a string
  const disputesWithDate: Dispute[] = disputesData.map((dispute) => ({
    ...dispute,
    createdAt: new Date(dispute.createdAt),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-red-600">Dispute Center</h1>

      <section className="space-y-4">
        {disputesWithDate.map((dispute) => (
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
