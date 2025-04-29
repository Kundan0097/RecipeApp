"use client"
import userLogo from "@/images/userLogo.jpg"
import Image from "next/image";
import { useAuth } from "../firebase/AuthContext";
import { useBookmark } from "@/context/BookmarkContext";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isSubscribed } = useAuth()
  const { bookmarks, recipes, deleteBookmark } = useBookmark();

  const bookmarkedRecipes = recipes?.filter((recipe) => bookmarks.includes(recipe.id));
  //  console.log("bookmarked recipes", bookmarkedRecipes); 



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* Profile Header */}
      {/* <div className="flex items-center justify-between  shadow-lg p-4 rounded-2xl">
         <div className="flex items-center space-x-4">
           <Image
               src={userLogo}
               width={100}
               height={100}
               alt="User Logo"
           />
           <div>
             <h2 className="text-xl font-semibold">{user?.displayName}</h2>
             <p className="text-gray-500">{user?.email}</p>
           </div>
         </div>
        {isSubscribed ? <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"  >
           Subscribed
         </button> :
          <Link href="/checkout">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"  >
           Upgrade to Premium
         </button>
        </Link>}
       </div> */}

      <div className="flex flex-col sm:flex-row items-center justify-between shadow-lg p-4 rounded-2xl gap-4">
        <div className="flex items-center space-x-4">
          <Image
            src={userLogo}
            width={100}
            height={100}
            alt="User Logo"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user?.displayName}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {isSubscribed ? (
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto">
            Subscribed
          </button>
        ) : (
          <Link href="/checkout" className="w-full sm:w-auto">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto">
              Upgrade to Premium
            </button>
          </Link>
        )}
      </div>


      {/* Saved Recipes */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Saved Recipes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="flex gap-3">
                <Link href={`/recipies/${id}`}>
                  <button className="mt-3 text-sm text-blue-600 font-semibold cursor-pointer">View Details</button>
                </Link>

                <button onClick={() => deleteBookmark(id)} className="mt-3 cursor-pointer text-sm text-red-600 font-semibold">Delete Bookmark</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Activity Feed</h3>
        <ul className="bg-white shadow-md p-4 rounded-lg space-y-3">
          {
            bookmarkedRecipes?.map(({ id, name, rating, reviewCount }) => (
              <li key={id} className="flex items-center space-x-4">

                <div>
                  <h4 className="text-md text-black font-semibold">{name}</h4>
                  <p className="text-gray-500">{rating} ({reviewCount} reviews)</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
