'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
    <div className="min-h-screen bg-[#141414] dark">


      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <Card className="shadow-lg bg-[#1c1c1c] border border-white/10 text-white">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-2xl text-white">Create New User</CardTitle>
            <CardDescription className="text-gray-400">Enter the details for the new user account</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 bg-[#1c1c1c]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-300">First Name</label>
                  <input
                    type="string"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-300">Last Name</label>
                  <input
                    type="string"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-300">Email</label>
                <input
                  type="string"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                />
              </div>
              
              {/* <div>
                <label className="block font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                />
              </div> */}

              <div>
                <label className="block font-medium text-gray-300">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white min-h-24 focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-300">Profile Picture URL</label>
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-300">Account Type</label>
                <select
                  name="accType"
                  value={formData.accType}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-gray-700 px-3 py-2 rounded-md mt-1 text-white focus:border-[#6ec8b9] focus:ring-1 focus:ring-[#6ec8b9]"
                >
                  <option value="client">Client</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="bg-[#1c1c1c] border-t border-white/10 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-md font-semibold transition duration-150"
            >
              Create User
            </button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}