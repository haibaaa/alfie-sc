'use client';
import { useState } from 'react';

export default function DisputeForm() {
  const [formData, setFormData] = useState({
    orderId: '',
    complainantId: '',
    respondentId: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dispute submitted:", formData);
    alert("Dispute submitted (check console)!");
    // TODO: Hook to backend API later
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-xl space-y-4">
      <input
        type="number"
        name="orderId"
        placeholder="Order ID"
        required
        value={formData.orderId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <input
        type="number"
        name="complainantId"
        placeholder="Complainant ID"
        required
        value={formData.complainantId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <input
        type="number"
        name="respondentId"
        placeholder="Respondent ID"
        required
        value={formData.respondentId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <textarea
        name="description"
        placeholder="Describe your issue..."
        required
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-xl"
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700"
      >
        Submit Dispute
      </button>
    </form>
  );
}
