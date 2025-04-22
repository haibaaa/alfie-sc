'use client';
import { useState } from 'react';

interface ReviewFormProps {
  onReviewSubmit: (newReview: Review) => void;  // Define the prop type for onReviewSubmit
}

interface Review {
  reviewId: number;
  reviewDate: string;
  rating: number;
  feedback: string;
  reviewerId: number;
  receiverId: number;
  reviewerName: string;
  receiverName: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewForm({ onReviewSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    rating: '',
    feedback: '',
    reviewerId: '',
    receiverId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: parseFloat(formData.rating),
          reviewerId: parseInt(formData.reviewerId),
          receiverId: parseInt(formData.receiverId),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Prepare the new review data with proper formatting
        const newReview = {
          reviewId: Date.now(),  // Generate a unique review ID
          reviewDate: new Date().toISOString().split('T')[0] || '',  // Ensure valid string value
          rating: parseFloat(formData.rating),
          feedback: formData.feedback,
          reviewerId: parseInt(formData.reviewerId),
          receiverId: parseInt(formData.receiverId),
          reviewerName: 'User One',  // This should be replaced with actual reviewer name if available
          receiverName: 'Receiver One',  // This should be replaced with actual receiver name if available
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Call the parent function to add the new review
        onReviewSubmit(newReview);

        // Clear the form fields
        setFormData({
          rating: '',
          feedback: '',
          reviewerId: '',
          receiverId: '',
        });
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-xl space-y-4">
      <input
        type="number"
        name="rating"
        placeholder="Rating (0.0 - 5.0)"
        step="0.1"
        max="5"
        min="0"
        required
        value={formData.rating}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl text-gray-500"
      />
      <textarea
        name="feedback"
        placeholder="Your feedback"
        required
        value={formData.feedback}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl text-gray-500"
      />
      <input
        type="text"
        name="reviewerId"
        placeholder="Reviewer ID"
        required
        value={formData.reviewerId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl text-gray-500"
      />
      <input
        type="text"
        name="receiverId"
        placeholder="Receiver ID"
        required
        value={formData.receiverId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl text-gray-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
}
