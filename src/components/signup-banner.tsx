"use client";

import React, { useState } from "react";
import Image from "next/image";
import FallbackImage from "./fallback-image";

const SignupBanner: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    // TODO: Hook into Mailchimp or backend API
  };

  return (
    <section className="w-full py-8">
      <div className="w-full lg:w-1/2 max-w-md">
        <h2 className="text-xl normal-case mb-4 text-[#33383CFF]">
          Keep updated with the new EDC&GLAM
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-row gap-2">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="* E-mail"
              className="px-4 border rounded-md border-gray-400 bg-transparent outline-none py-2 font-light text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-[120px] text-sm rounded-md bg-[#5D676CFF] text-white py-2 hover:bg-gray-800 transition normal-case"
          >
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignupBanner;
