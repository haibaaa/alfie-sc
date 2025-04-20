'use client';
import { useState } from 'react';

export default function ReviewForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", formData);
    alert("Review submitted (check console)!");
    // TODO: Integrate backend API call
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
        className="w-full border px-3 py-2 rounded-xl"
      />
      <textarea
        name="feedback"
        placeholder="Your feedback"
        required
        value={formData.feedback}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <input
        type="text"
        name="reviewerId"
        placeholder="Reviewer ID"
        required
        value={formData.reviewerId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <input
        type="text"
        name="receiverId"
        placeholder="Receiver ID"
        required
        value={formData.receiverId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
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
