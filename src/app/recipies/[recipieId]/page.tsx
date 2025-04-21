"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function RecipieDetails() {
  const { recipieId } = useParams()
  // console.log("paramId", recipieId)

  interface Recipe {
    name: string;
    image: string;
    ingredients: string[];
    instructions: string[];
  }

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const singleRecipie = process.env.NEXT_PUBLIC_SINGLE_RECIPIE;

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!singleRecipie) {
        console.error("API URL is not defined");
        return;
      }

      try {
        const response = await fetch(`${singleRecipie}/${recipieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipieId, singleRecipie]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="p-5 flex flex-col items-center text-center bg-background text-foreground min-h-screen">
      <div>
      <h1 className="text-3xl font-bold mt-4 text-blue-700">{recipe.name}</h1>
      <div className="flex justify-evenly flex-col md:flex-row items-center  mt-6 bg-white p-6 rounded-lg shadow-lg">
        <Image
          src={recipe.image}
          width={250}
          height={250}
          alt={recipe.name}
          className="rounded-lg shadow-md"
        />

        <div className="text-left">
          <h3 className="text-xl font-semibold text-blue-600">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {recipe.ingredients.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 text-left rounded-lg shadow-lg w-full max-w-2xl">
        <h3 className="text-xl text-center font-semibold text-blue-600">Instructions:</h3>
        <ol className="list-decimal list-inside text-gray-700 mt-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-600 mt-1">{step}</li>
          ))}
        </ol>
      </div>

      <Link href="/recipies">
        <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer shadow-md hover:bg-blue-700 transition">
          Back to Recipes
        </button>
      </Link>
      </div>
      
    </div>

  )
}

export default RecipieDetails