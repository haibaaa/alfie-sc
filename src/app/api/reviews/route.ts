// app/api/reviews/route.ts
import { NextResponse } from 'next/server';
import { db } from '~/server/db'; // adjust path based on your setup
import { reviews } from '~/server/db/schema';
import { users } from '~/server/db/schema';
import { sql, eq } from 'drizzle-orm'; // Assuming you're using drizzle-orm


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, feedback, reviewerId, receiverId } = body;

    // basic sanity checks (optional, but safe)
    if (
      typeof rating !== 'number' ||
      typeof feedback !== 'string' ||
      typeof reviewerId !== 'number' ||
      typeof receiverId !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid data types' }, { status: 400 });
    }

    // Insert review without needing to manually specify reviewDate
    await db.insert(reviews).values({
      rating: rating.toString(), // Convert number to string for rating
      feedback,
      reviewerId,
      receiverId,
      // reviewDate is automatically handled by the default in the schema
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const reviewsData = await db
      .select({
        reviewId: reviews.reviewId,
        reviewDate: reviews.reviewDate,
        rating: reviews.rating,
        feedback: reviews.feedback,
        reviewerId: reviews.reviewerId,
        receiverId: reviews.receiverId,
      })
      .from(reviews)
      .orderBy(sql`${reviews.reviewDate} DESC`);

    console.log('Reviews Data:', reviewsData); // Log reviews data to check if it's being fetched

    const formattedReviews = await Promise.all(
      reviewsData.map(async (review) => {
        const reviewer = await db
          .select({ firstName: users.firstName, lastName: users.lastName })
          .from(users)
          .where(eq(users.userId, review.reviewerId))
          .limit(1);

        const receiver = await db
          .select({ firstName: users.firstName, lastName: users.lastName })
          .from(users)
          .where(eq(users.userId, review.receiverId))
          .limit(1);

        return {
          reviewId: review.reviewId,
          reviewDate: new Date(review.reviewDate).toISOString().split('T')[0],
          rating: parseFloat(review.rating.toString()),
          feedback: review.feedback,
          reviewerName: reviewer[0] ? `${reviewer[0].firstName} ${reviewer[0].lastName}` : 'Unknown',
          receiverName: receiver[0] ? `${receiver[0].firstName} ${receiver[0].lastName}` : 'Unknown',
        };
      })
    );

    console.log('Formatted Reviews:', formattedReviews); // Log formatted reviews to check if it's processed correctly

    return NextResponse.json({ success: true, data: formattedReviews });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
