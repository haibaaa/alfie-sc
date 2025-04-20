'use client';
import { useState } from 'react';
import { createDispute } from '../../actions/disputes'; // Make sure this path is correct

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dispute submitted:", formData);

    // Call the createDispute server-side function
    try {
      await createDispute({
        orderId: Number(formData.orderId),
        complainantId: Number(formData.complainantId),
        respondentId: Number(formData.respondentId),
        description: formData.description,
      });
      alert("Dispute submitted successfully!");
    } catch (error) {
      console.error("Error submitting dispute:", error);
      alert("There was an error submitting your dispute.");
    }

    // Optionally, reset the form after submission
    setFormData({
      orderId: '',
      complainantId: '',
      respondentId: '',
      description: '',
    });
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
