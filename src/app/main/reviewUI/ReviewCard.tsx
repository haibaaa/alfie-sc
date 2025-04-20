'use client';
import type { Review } from './mockData';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{review.reviewerName}</span>
        <span className="text-sm text-gray-500">{review.reviewDate}</span>
      </div>
      <p className="text-gray-700">{review.feedback}</p>
      <div className="text-yellow-500 font-bold">⭐ {review.rating}</div>
    </div>
  );
}
