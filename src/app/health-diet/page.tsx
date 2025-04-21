import React from 'react';

export default function HealthDietPage() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Guide to a Healthy Diet</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">Discover balanced meals, smart nutrition tips, and a path to better wellness.</p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why a Healthy Diet Matters</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Boost Energy', desc: 'Whole foods and balanced meals help fuel your body throughout the day.' },
            { title: 'Strengthen Immunity', desc: 'Nutrients like vitamins C, D, and zinc support a strong immune system.' },
            { title: 'Improve Mood', desc: 'Foods rich in omega-3 and antioxidants can enhance mental well-being.' },
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diet Tips Section */}
      <section className="bg-white py-16 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-12">Healthy Diet Tips</h2>
        <ul className="space-y-6 max-w-3xl mx-auto text-lg">
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span> Eat more fruits and vegetables daily.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span> Choose whole grains over refined carbs.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span> Stay hydrated by drinking enough water.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span> Avoid excess sugar, salt, and processed foods.
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="bg-green-100 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Your Healthy Journey Today</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">Small steps lead to big results. Begin by making one healthy change today.</p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition">
          Get a Free Diet Plan
        </button>
      </section>
    </div>
  );
}
