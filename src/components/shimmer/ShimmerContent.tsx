import React from 'react'
import Image from 'next/image'
import { FaStar } from "react-icons/fa";
import dummy from "@/images/newdummy.jpg"

function ShimmerContent() {
  return (
    <div className="max-w-md mx-auto bg-background border w-65 h-100 border-gray-50 rounded-2xl shadow-xl overflow-hidden m-4 p-4">
                <Image
                  src={dummy}
                  alt="image"
                  width={250}
                  height={200}
                  // className="rounded-md"
                  style={{
                    width: '100%', // responsive width
                    height: 'auto', // maintain aspect ratio
                    borderRadius:"10px"
                  }}
                />

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold"></h2>
                    <div className="flex items-center space-x-1">
                      <FaStar className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700 font-medium"></span>
                      <span className="text-gray-500 text-sm">(0 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                 
                    <span  className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      tags
                    </span>
                
                  
                    <span  className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs">
                      meal
                    </span>
                 
                </div>

              
               <button className="mt-3 text-sm text-blue-600 font-semibold cursor-pointer">
                   View Details
                </button>
               
               
              </div>
  )
}

export default ShimmerContent