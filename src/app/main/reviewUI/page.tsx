'use client';

import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { mockReviews } from './mockData';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">User Reviews</h1>

      <section className="space-y-4">
        {mockReviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </section>

      <hr className="my-6" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <ReviewForm />
      </section>
    </div>
  );
}
