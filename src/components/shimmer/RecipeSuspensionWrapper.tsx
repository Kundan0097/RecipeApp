"use client"

import React, { Suspense } from 'react'
import RecipieComponent from '@/components/RecipieComponent'
import Shimmer from './Shimmer'
function RecipeSuspensionWrapper() {
  return (
   <Suspense fallback={<Shimmer/>}>
      <RecipieComponent updatedRecipes={[]} />
   </Suspense>
  )
}

export default RecipeSuspensionWrapper