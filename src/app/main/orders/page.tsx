import { db } from '~/server/db';
import { orders, gigs } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) return <div>Please sign in to view your orders.</div>;

  const userIdInt = parseInt(userId, 10);

  // Ensure that the userId is a valid integer before making the query
  if (isNaN(userIdInt)) {
    return <div>Error: Invalid user ID.</div>;
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.clientId, (userIdInt)))
    .innerJoin(gigs, eq(orders.gigId, gigs.gigId));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">You haven't booked any gigs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userOrders.map(({ gigs: gig, orders: order }) => (
            <div key={order.orderId} className="p-4 border rounded-lg bg-white shadow">
              <h2 className="text-lg font-semibold">{gig.title}</h2>
              <p className="text-sm text-gray-600">{gig.description}</p>
              <p className="text-sm mt-2">
                <span className="font-medium">Amount:</span> ${order.amount}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                {order.paymentStatus ? '✅ Paid' : '❌ Not Paid'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
