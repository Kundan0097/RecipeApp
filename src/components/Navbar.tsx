"use client"

import Image from 'next/image';
import { FaBookmark, FaUser } from 'react-icons/fa';
import logo from "@/images/recipie-logo.jpg"
import { useAuth } from '@/app/firebase/AuthContext';
import Link from 'next/link';
import ThemeToggle from "@/utils/ThemeToggles"
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';


export default function Navbar() {

  const { logout, userMessage, user, isAdmin,refreshUserData } = useAuth()

    useEffect(()=>{
      refreshUserData()
    },[refreshUserData])
  

  // console.log("isAdmin in navbar", isAdmin)
  // console.log("user in navbar", user)

  const {t} = useLanguage()


  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background text-foreground backdrop-blur-lg shadow-md">
  <div className="container mx-auto px-4 py-4 flex flex-wrap md:flex-nowrap items-center justify-around">
    
    {/* Logo */}
    <div className="flex items-center space-x-3">
      <Link href="/">
        <Image
          src={logo}
          alt="Recipe Logo"
          width={60}
          height={60}
          className="rounded-lg shadow-md hover:scale-105 transition duration-300"
        />
      </Link>
      {/* <span className="text-xl font-semibold hidden sm:inline">Recipe World</span> */}

      {/* Nav Links */}
    <ul className="flex flex-wrap  justify-center gap-4 mt-4 md:mt-0 font-serif text-base">
      {isAdmin ? (
        <li className="hover:text-green-500 transition-colors duration-200">
          <Link href="/dashboard">Dashboard</Link>
        </li>
      ) : (
        <>
          <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/recipies">{t.allrecipies}</Link>
          </li>
          <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/chat">🍳 {t.dishGenie}</Link>
          </li>
          {/* <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/nearby">{t.nearby}</Link>
          </li> */}
          <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/health-tips">{t.healthtips}</Link>
          </li>
          <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/health-diet">{t.healthdiet}</Link>
          </li>
          <li className="hover:text-green-500 transition-colors duration-200">
            <Link href="/profile">{t.profile}</Link>
          </li>
        </>
      )}
    </ul>
    </div>

    

   
   <div className='flex items-center gap-2 mt-4 md:mt-0 justify-center'>
     {/* Right-side Icons & Actions */}
     <div className="flex items-center gap-2">
     {isAdmin ? "" : <>
      {/* <FaSearch className="text-xl hover:text-green-500 cursor-pointer" /> */}
      <Link href="/bookmark">
        <FaBookmark className="text-xl hover:text-green-500 cursor-pointer" />
      </Link>
     </>}

      {user ? (
        <>
          <span className="text-sm font-medium hidden sm:inline">{userMessage}</span>
          <button
            onClick={logout}
            className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm hover:bg-blue-700 transition"
          >
            {t.logout}
          </button>
        </>
      ) : (
        <Link href="/login">
          <FaUser className="text-xl hover:text-green-300 cursor-pointer" />
        </Link>
      )}

    </div>
   <ThemeToggle />
   <LanguageSwitcher />
   </div>
  </div>
</nav>

  );
}