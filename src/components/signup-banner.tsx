'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SignupBanner: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
    // TODO: Hook into Mailchimp or backend API
  };

  return (
    <section className="w-full py-16 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/images/metal-heart.png" // replace with your actual path
            alt="metal heart"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>

        {/* Right Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <h2 className="text-2xl font-bold uppercase mb-2">Join the Cult</h2>
          <p className="text-sm text-gray-600 mb-6 tracking-wide">
            Become a Nailcissist and be the first to receive access to collections, exclusive offers & more
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-400 bg-transparent outline-none py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-400 bg-transparent outline-none py-2"
              />
            </div>

            <button
              type="submit"
              className="uppercase bg-black text-white py-3 mt-2 hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupBanner;
