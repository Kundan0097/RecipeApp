"use client"
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className='text-2xl font-bold'>Page Not Found</h1>
            <p className='text-gray-500'>Sorry, the page you are looking for does not exist.</p>
            <p className='text-gray-500'>Please check the URL or go back to the homepage.</p>
            <Link href="/" className='mt-4 text-blue-500 hover:underline'>Go to Homepage</Link>
        </div>
    </>
  )
}

export default NotFoundPage