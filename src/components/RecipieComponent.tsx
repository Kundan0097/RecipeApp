"use client";
import { useAuth } from "@/app/firebase/AuthContext";
import { useBookmark } from "@/context/BookmarkContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaStar } from "react-icons/fa";
import Shimmer from "./shimmer/Shimmer";
// import FreeRecipies from "./FreeRecipies";

interface Recipe {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  tags: string[];
  mealType: string[];
}

const RecipeComponent = ({ updatedRecipes }: { updatedRecipes: Recipe[] }) => {
  const [recipiesNew, setRecipiesNew] = useState<Recipe[]>([])
  const { toggleBookmark, setRecipies } = useBookmark()
  const router = useRouter()
  const { isSubscribed, user ,refreshUserData } = useAuth()
  const [loading, setLoading] = useState(true)

  // console.log("updatedRecipes", updatedRecipes)
  useEffect(()=>{
    refreshUserData()
  },[])

  useEffect(() => {
    try {
      let modifiedRecipes = [...updatedRecipes];
      if (isSubscribed) {
        // Override all isPremium to false if user is subscribed
        modifiedRecipes = updatedRecipes.map((recipe) => ({
          ...recipe,
          isPremium: false,
        }));
        setRecipiesNew(modifiedRecipes);
        setRecipies?.(modifiedRecipes);
      } else {
        setRecipiesNew(updatedRecipes);
        setRecipies?.(updatedRecipes);
      }

      if (!user) {
        setRecipiesNew(modifiedRecipes);
        setRecipies?.(modifiedRecipes);
      }

    } catch (error) {
      console.error("Error fetching recipes:", error);
    }finally{
      setLoading(false)
    }
  }, [updatedRecipes, isSubscribed, setRecipies, user]);

  console.log("isSubscribed", isSubscribed)

  

  const onSubscribe = () => {
    router.push('/checkout')
  }

  if(loading) {
    return <Shimmer/>
  }

  return (
    <div className="bg-background text-foreground ">
      <h1 className="text-foreground font-bold text-4xl text-center mt-8 mb-8">Savor & Serve: Delicious Recipes for Every Occasion</h1>
      <h1 className="text-3xl font-bold px-8">Premium Recipies</h1>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-4 p-4 gap-4">
        {
          recipiesNew.map((recipe) => {
            const { name, id, image, rating, reviewCount } = recipe

            return <div key={id}
              className="max-w-md mx-auto bg-background border border-green-200 rounded-2xl shadow-xl overflow-hidden m-4 p-4 ">
              <div >
                <Image
                  src={image}
                  alt={name}
                  width={250}
                  height={200}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />

              </div>

              <div className="p-4 relative ">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-xl w font-semibold">{name}</h2>
                  <div>
                    {
                        isSubscribed  ? <button
                          className="p-2 rounded-full cursor-pointer text bg-background text-foreground"
                          onClick={() => toggleBookmark(id)}>
                          <FaBookmark className="w-6 h-6" />
                        </button> : ""
                      }

                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-3">
                  <FaStar className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">{rating}</span>
                  <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
                </div>



              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {recipe.mealType.map((meal) => (
                  <span key={meal} className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs">
                    {meal}
                  </span>
                ))}
              </div>

              {
                isSubscribed ? <Link href={`/recipies/${id}`}>
                  <button className="mt-3 text-sm bg-black text-white px-2 py-1 rounded border  font-semibold cursor-pointer">
                    View Details
                  </button>
                </Link> : <button
                  onClick={onSubscribe}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  🔒 Subscribe to Unlock
                </button>
              }

            </div>
          })
        }
      </div>

    </div>
  );
};

export default RecipeComponent;