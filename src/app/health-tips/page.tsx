'use client';
import React from 'react';

const tips = [
   {
     title: "Hydrate Before Meals",
     description: "Drinking water 30 minutes before meals improves digestion and helps control appetite.",
   },
   {
     title: "Colorful Plates",
     description: "Eat a variety of colorful fruits and vegetables to get a wide range of nutrients.",
   },
   {
     title: "Limit Processed Sugar",
     description: "Replace sugary treats with fruits like berries, bananas, or dates for natural sweetness.",
   },
   {
     title: "Eat Whole Grains",
     description: "Choose brown rice, quinoa, and oats instead of white rice or bread for fiber and sustained energy.",
   },
   {
     title: "Healthy Fats Are Good",
     description: "Incorporate avocados, olive oil, chia seeds, and nuts to promote heart and brain health.",
   },
   {
     title: "Mindful Eating",
     description: "Eat slowly, savor flavors, and avoid distractions to improve digestion and satisfaction.",
   },
   {
     title: "Portion Control",
     description: "Use smaller plates and bowls to help control portions without feeling deprived.",
   },
   {
     title: "Cook with Herbs & Spices",
     description: "Herbs like turmeric, ginger, garlic, and rosemary add flavor and offer powerful antioxidants.",
   },
   {
     title: "Lean Protein Matters",
     description: "Include chicken, legumes, tofu, or fish to support muscle growth and keep you full longer.",
   },
   {
     title: "Don’t Skip Breakfast",
     description: "Start your day with a protein-rich breakfast to regulate blood sugar and energy levels.",
   },
   {
     title: "Smart Snacking",
     description: "Snack on boiled eggs, nuts, fruits, or hummus with veggies to avoid unhealthy cravings.",
   },
   {
     title: "Meal Prep Weekly",
     description: "Preparing meals in advance helps you eat healthy, save time, and reduce food waste.",
   },
 ];
 
export default function HealthTipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🥦 Healthy Eating Tips
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-green-600 mb-2">{tip.title}</h2>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
