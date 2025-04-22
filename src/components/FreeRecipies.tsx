// "use client"
// import React, { useEffect } from 'react'
// import freeRecipies from "@/components/jsondata/freeRecipies.json"
// import Image from "next/image";
// import { FaBookmark, FaStar } from "react-icons/fa";
// import Link from 'next/link';
// import { useBookmark } from '@/context/BookmarkContext';
// function FreeRecipies() {
//       console.log("freeRecipies", freeRecipies)
//      const { toggleBookmark,  setRecipies } = useBookmark()

     
//   useEffect(() => {
//     try {
     
//     setRecipies?.(freeRecipies.map(recipe => ({
//       ...recipe,
//       mealType: recipe.mealType.join(", ") // Convert array to a comma-separated string
//     })))

//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   }, [  setRecipies,  ]);
   
//   return (
//    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-4 p-4 gap-4">
//    {
//      freeRecipies.map((recipe) => {
//        const { name, id, image, rating, reviewCount } = recipe

//        return <div key={id}
//          className="max-w-md mx-auto bg-background border border-green-200 rounded-2xl shadow-xl overflow-hidden m-4 p-4">
//          <div >
//            <Image
//              src={image}
//              alt={name}
//              width={250}
//              height={200}
//              style={{ width: "100%", height: "50%", borderRadius: "10px" }}
//            />
//          </div>

//          <div className="p-4 relative">
//            <div className="flex w-full items-center justify-between">
//              <h2 className="text-xl w font-semibold">{name}</h2>
//              <div>
//                <button
//                    className="p-2 rounded-full cursor-pointer text bg-background text-foreground"
//                    onClick={() => toggleBookmark(id)}>
//                    <FaBookmark className="w-6 h-6" />
//                  </button> 
//              </div>
//            </div>
//            <div className="flex items-center space-x-1 mt-3">
//              <FaStar className="w-5 h-5 text-yellow-500" />
//              <span className="text-gray-700 font-medium">{rating}</span>
//              <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
//            </div>
//          </div>

//          <div className="flex flex-wrap gap-2 mt-2">
//            {recipe.tags.map((tag) => (
//              <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
//                {tag}
//              </span>
//            ))}
//            {recipe.mealType.map((meal) => (
//              <span key={meal} className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs">
//                {meal}
//              </span>
//            ))}
//          </div>

//          <Link href={`/recipies/${id}`}>
//              <button className="mt-3 text-sm bg-black text-white px-2 py-1 rounded border  font-semibold cursor-pointer">
//                View Details
//              </button>
//            </Link> 

//        </div>
//      })
//    }
//  </div>
//   )
// }

// export default FreeRecipies