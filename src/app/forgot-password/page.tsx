"use client";
import { useState } from "react";
import { auth } from "@/app/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email,{
         url: "http://localhost:3000/reset-password", 
      });
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ">
     <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
     <h2 className="text-3xl mb-4 font-bold text-center">Reset Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fdprocessedid="ffzwns"
        />
        <button type="submit"
                fdprocessedid="1lafnc"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200 ease-in-out">
            Reset Password</button>
      </form>
      {message && <p>{message}</p>}
     </div>
    </div>
  );
};

export default ForgotPassword;
