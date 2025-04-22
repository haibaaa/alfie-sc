import { db } from '~/server/db';
import { orders, gigs, users } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export default async function OrdersPage() {
  const { userId } = await auth();

  console.log("Current userId:", userId);

  if (!userId) return <div>Please sign in to view your orders.</div>;

  // Fetch the user data from the users table using the Clerk userId (userHash)
  const user = await db
    .select()
    .from(users)
    .where(eq(users.userHash, userId))  // Clerk's userId is stored in the userHash field
    .limit(1)
    .then((res) => res[0]);

  if (!user) {
    return <div>Error: User not found.</div>;
  }

  const userHash = user.userHash;  // This is the Clerk userId stored in userHash

  // Ensure that userHash is valid before proceeding
  if (!userHash) {
    return <div>Error: Invalid user hash.</div>;
  }

  // Fetch the user's orders using the userHash
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.clientId, user.userId))  // Use the actual userId from the users table to query orders
    .innerJoin(gigs, eq(orders.gigId, gigs.gigId))  // Joining with gigs table
    .execute()  // Use execute instead of select to run the query
    .then((res) => res);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-white">Your Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">You haven't booked any gigs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userOrders.map(({ gigs: gig, orders: order }) => (
            <div key={order.orderId} className="p-4 border rounded-lg bg-white shadow">
              <h2 className="text-lg font-semibold text-black">{gig.title}</h2>
              <p className="text-sm text-black">{gig.description}</p>
              <p className="text-sm mt-2 text-black">
                <span className="font-medium">Amount:</span> ${order.amount}
              </p>
              <p className="text-sm text-black">
                <span className="font-medium">Status:</span>{' '}
                {order.paymentStatus ? '✅ Paid' : '❌ Not Paid'}
              </p>
              <p className="text-sm text-black">
                <span className="font-medium">Transaction Date:</span> 
                {order.transactionDate ? new Date(order.transactionDate).toLocaleDateString() : 'No Date Available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
