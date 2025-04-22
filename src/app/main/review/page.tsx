'use client';

import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

interface Review {
  reviewId: number;
  reviewDate: string;
  rating: number;
  feedback: string;
  receiverId: number;
  reviewerId: number;
  reviewerName: string;
  receiverName: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);  // Assuming the fetched data is in `data.data`
        } else {
          console.error('Error fetching reviews');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const handleReviewSubmit = (newReview: Review) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);  // Add the new review at the top
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8 text-green-500">
      <h1 className="text-3xl font-bold text-center">User Reviews</h1>

      <section className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </section>

      <hr className="my-6" />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-500">Leave a Review</h2> 

        <ReviewForm onReviewSubmit={handleReviewSubmit} />  {/* Pass the function */}
      </section>
    </div>
  );
}
