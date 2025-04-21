"use client";
import React from "react";

const Shimmer = () => {

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-4 p-4 gap-4">
      {Array(10).fill(0).map((_, index) => (
        <div
          key={index}
          className="animate-pulse max-w-md mx-auto bg-background border w-3xs h-96 border-gray-200 rounded-2xl shadow overflow-hidden m-4 p-4"
        >
          <div className="bg-gray-300 h-40 w-full rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="flex gap-2 flex-wrap">
            <div className="h-4 bg-gray-300 rounded w-12"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="mt-3 h-8 w-24 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;