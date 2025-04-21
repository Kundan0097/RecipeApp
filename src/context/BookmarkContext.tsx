"use client"

import { useAuth } from "@/app/firebase/AuthContext";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RecipeType= {
  id:number;
  name:string;
  image:string;
  rating:number;
  reviewCount:number;
  tags:string[];
  mealType:string;
}


type BookmarkContextType = {
  bookmarks: number[];
  toggleBookmark: (recipeId: number) => void;
  recipes?: RecipeType[];
  setRecipies?: (recipies: RecipeType[]) => void;
  setBookmarks?: (bookmarks: number[]) => void;
  deleteBookmark: (recipeId: number) => void;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({children} :{children: React.ReactNode})=>{
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [recipes, setRecipies] = useState<RecipeType[]>([])
  const [isInitialized, setIsInitialized] = useState(false);
    // console.log("bookmarks in context", bookmarks)
    const { user } = useAuth(); 
    const uid = user?.uid;
  
   //Load bookmarks from Local Storage on page load
   useEffect(() => {
    if (!uid || isInitialized) return;

    const storedBookmarks = localStorage.getItem(`bookmarks_${uid}`);
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }

    const storedRecipes = localStorage.getItem(`recipes_${uid}`);
    if (storedRecipes) {
      setRecipies(JSON.parse(storedRecipes));
    }
    setIsInitialized(true);
  }, [setBookmarks, setRecipies,uid , isInitialized]);


  

  // Save bookmarks to Local Storage whenever they change
  useEffect(() => {
    if (!uid) return;
    localStorage.setItem(`bookmarks_${uid}`, JSON.stringify(bookmarks));
    localStorage.setItem(`recipes_${uid}`, JSON.stringify(recipes));

  }, [bookmarks ,recipes,uid]);

  

  const toggleBookmark = async(id: number) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(id);
  
      if (!isBookmarked) {
        toast.success("Recipe added to bookmarks!", { toastId: `add-${id}` });
        return [...prev, id];
      } else {
        toast.info("Bookmark removed!", { toastId: `remove-${id}` });
        return prev.filter((bookmarkId) => bookmarkId !== id);
      }
    });
  };


  // Delete a single bookmark
  const deleteBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarks([]);
  };


  return(
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark ,recipes , setRecipies ,deleteBookmark, clearBookmarks ,setBookmarks}}>
      {children}
    </BookmarkContext.Provider>
  )

}

export const useBookmark = () =>{
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
}