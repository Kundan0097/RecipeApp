"use client";
import { useBookmark } from "@/context/BookmarkContext";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/AuthContext";

const BookmarksPage = () => {

  type RecipeType= {
    id:number;
    name:string;
    image:string;
    rating:number;
    reviewCount:number;
    tags:string[];
    mealType:string;
  }

  const { bookmarks ,recipes ,deleteBookmark , clearBookmarks, setBookmarks } = useBookmark();
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState<RecipeType[]>([]);
    console.log("bookmarks in bookmark page", bookmarks)
    // console.log("recipes in bookmark page", recipes)
    const {user} = useAuth()
  


    useEffect(()=>{
    const recipieData = recipes?.filter((recipe) => bookmarks.includes(recipe.id));
    setBookmarkedRecipes(recipieData || []);
    // console.log("bookmarked recipes", recipieData); 

    
  
  },[recipes, bookmarks])

  useEffect(()=>{
    if(!user){
      if (setBookmarks) {
        setBookmarks([]);
      }
    }
  },[user,setBookmarks])
 
  // useEffect(()=>{

  // },[])

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <button onClick={clearBookmarks}  className="text-sm text-white bg-red-500 px-3 py-2 rounded-md font-semibold">Clear All Bookmarks</button>
      </div>
      {/* <h1 className="text-3xl font-bold text-center">Your Bookmarked Recipes</h1> */}

      {bookmarkedRecipes?.length === 0 ? (
        <p className="text-center mt-4">No bookmarks yet. Start saving your favorite recipes!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-4 mt-6">
          {bookmarkedRecipes?.map(({ id, name, image, rating, reviewCount }) => (
            <div key={id} className="border rounded-lg shadow-md p-4">
              <Image
                  src={image}
                  alt={name}
                  width={250}
                  height={200}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                  className="w-full h-40 object-cover rounded-md"
              />
              {/* <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" /> */}
              <h2 className="text-lg font-semibold mt-2">{name}</h2>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-500" />
                <span className="ml-1">{rating} ({reviewCount} reviews)</span>
              </div>
              <Link href={`/recipies/${id}`}>
                <button className="mt-3 text-sm text-blue-600 font-semibold cursor-pointer">View Details</button>
              </Link>

              <button onClick={()=>deleteBookmark(id)} className="mt-3 cursor-pointer text-sm text-red-600 font-semibold">Delete Bookmark</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
