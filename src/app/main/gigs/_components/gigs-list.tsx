'use client';

type Gig = {
  gigId: number;
  title: string;
  description: string;
  price: number;
  category: string;
  deliveryTime: number;
  freelancer: {
    id: number;
    name: string;
  };
};

export function GigList({ gigs }: { gigs: Gig[] }) {
  return (
    <div className="grid gap-4 mt-6">
      {gigs.map((gig) => (
        <div key={gig.gigId} className="p-4 border rounded-lg bg-white text-black shadow-sm">
          <h2 className="text-xl font-semibold">{gig.title}</h2>
          <p className="text-sm text-gray-600">{gig.description}</p>
          <p className="mt-2 text-sm">💼 {gig.category}</p>
          <p className="text-sm">⏱️ {gig.deliveryTime} days</p>
          <p className="text-sm">💸 ${gig.price}</p>
          <p className="mt-2 font-medium">👤 {gig.freelancer.name}</p>
        </div>
      ))}
    </div>
  );
}
