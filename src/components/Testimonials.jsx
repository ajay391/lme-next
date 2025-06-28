import React from 'react';

const testimonials = [
  {
    name: 'Rohit S.',
    quote: "Super comfy! The quality is 🔥 and the oversized fit is perfect.",
  },
  {
    name: 'Meera T.',
    quote: "I wear my Nowhere hoodie every day. No regrets.",
  },
];

export const Testimonials = () => (
  <section className="py-16 px-6 sm:px-10 lg:px-24 bg-gray-100">
    <h2 className="text-3xl font-bold mb-10 text-center">What People Say</h2>
    <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-md">
          <p className="italic">"{t.quote}"</p>
          <p className="font-semibold mt-4 text-right">- {t.name}</p>
        </div>
      ))}
    </div>
  </section>
);
