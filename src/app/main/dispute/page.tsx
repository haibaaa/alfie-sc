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
    <div className="min-h-screen bg-[#141414] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dispute Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Disputes List Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-medium text-white mb-4">Active Disputes</h2>
            
            {disputesWithDate.length > 0 ? (
              disputesWithDate.map((dispute) => (
                <DisputeCard key={dispute.disputeId} dispute={dispute} />
              ))
            ) : (
              <div className="bg-[#1c1c1c] border-0 border-gray-800 rounded-xl p-8 text-center text-gray-400">
                No active disputes found
              </div>
            )}
          </div>
          
          {/* Dispute Form Section */}
          <div className="lg:col-span-1">
            <DisputeForm />
          </div>
        </div>
      </div>
    </div>
  );
}