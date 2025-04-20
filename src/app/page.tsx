'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    accType: 'client',
    profilePicture: '',
    rating: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('User submitted:', formData);
  //   alert('User data submitted! (check console)');
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert('✅ User created successfully!');
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      console.error('❌ Submit error:', err);
      alert('Something went wrong while submitting the form.');
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Nav Bar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">YourApp</div>
        <div className="space-x-4 text-sm sm:text-base">
          <Link href="/messageUI" className="text-green-600 hover:underline">
            💬 Messages
          </Link>
          <Link href="/reviewUI" className="text-blue-600 hover:underline">
            📝 Reviews
          </Link>
          <Link href="/disputeUI" className="text-red-600 hover:underline">
            🛠️ Disputes
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Create New User</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="string"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="string"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="string"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div>

          {/* <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div> */}

          

          <div>
            <label className="block font-medium">Account Type</label>
            <select
              name="accType"
              value={formData.accType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

        

          {/* <div>
            <label className="block font-medium">Rating (optional)</label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
            />
          </div> */}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
