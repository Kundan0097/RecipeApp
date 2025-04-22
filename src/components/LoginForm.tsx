"use client"

// import { login } from '@/app/firebase/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import MiniLoader from './MiniLoader';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useAuth } from '@/app/firebase/AuthContext';
import { signInWithFacebook, signInWithGoogle } from '@/app/firebase/Auth';

const LoginForm = () => {

  const router = useRouter()
  const { login ,message ,user } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(user){
        router.push('/')
    }
  },[user , router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await login(email, password)
      router.push('/')
    } catch (error) {
      // setErrorMessage("User not Found", error)
      console.log("Error in login", error)
    } finally {
      setLoading(false)
    }

  };

  const handleBack = () => {
    router.push("/")
  }

  const googleSignIn = async () => {
    try{
     await signInWithGoogle()
      router.push("/")
    }catch(error){
      console.log("Error in google sign in", error)

    }
  }
  const facebookSignIn = async () => {
    try{
      await signInWithFacebook()
       router.push("/")
     }catch(error){
       console.log("Error in facebook sign in", error)
 
     }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 relative">

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className='bg-gray-600 w-10 text-white flex justify-center rounded'>
          <button onClick={handleBack} >Back</button>
        </div>
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // fdprocessedid="fdr1ni"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full pl-10 text-black pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // fdprocessedid="5l7qg"
              />
            </div>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              // fdprocessedid="lgzlcn"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {
                loading ? <MiniLoader /> : "Sign in"
              }
            </button>
          </div>


          <div>
            <p className='text-center font-bold text-2xl text-black'>or</p>
            <div className='flex justify-around items-center'>
              <button
                type="submit"
                onClick={googleSignIn}
                className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white  bg-black hover:bg-blue-700 cursor-pointer"
              >
                <FcGoogle />
              </button>
              <button
                type="submit"
                onClick={facebookSignIn}
                className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-black hover:bg-blue-700 cursor-pointer"
              >
                <SiFacebook />
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>

        </form>
      </div>
      <div className='absolute top-10 right-10'>
        {/* {errorMessage && <p className='bg-red-700 text-white px-4 py-2 rounded'>{errorMessage}</p>} */}
        {
         message ? <p className='bg-green-700 text-white px-4 py-2 rounded'>{message}</p> : ""
        }
      </div>
    </div>
  );
};

export default LoginForm;