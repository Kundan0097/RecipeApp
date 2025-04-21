
'use client'
import { useAuth } from '@/app/firebase/AuthContext'
import { useState } from 'react'
import Link from 'next/link'

export default function HuggingFaceChat() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
//   console.log('prompt', prompt)
  console.log('response', response)

const {isSubscribed , user} = useAuth()

  const handleSend = async () => {
   setResponse("Loading...")
   try {
     const res = await fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ prompt }),
     })
 
     // Check if the response is OK
     if (!res.ok) {
       const errorText = await res.text()
       console.error("API Error:", errorText)
       setResponse("API Error: " + res.status)
       return
     }
 
     const data = await res.json()
     console.log("API Response:", data)
 
     if (!data || !data[0]?.generated_text) {
       setResponse("No response from model.")
     } else {
       setResponse(data[0].generated_text)
     }
   } catch (err) {
     console.error("Fetch error:", err)
     setResponse("Error talking to API.")
   }
 }

 

  return isSubscribed ? (
   <div className="flex flex-col max-w-2xl mx-auto h-[70vh] p-4 bg-white shadow-xl rounded-2xl border border-gray-200 m-10">

  {/* Chat response area - scrollable */}
  <div className="flex-1 overflow-y-auto space-y-4 p-4 mb-4 bg-gray-50 rounded-xl border border-gray-200">
    <div className="whitespace-pre-wrap text-sm text-gray-800 bg-white rounded-xl p-4 shadow-sm">
      <strong className="text-blue-600">Assistant:</strong><br />
      {response || "Ask me for a recipe 🍲"}
    </div>
  </div>

  {/* Input at the bottom */}
  <div className="border-t pt-4">
    <div className="flex flex-col gap-2">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for a recipe..."
        className="w-full min-h-[100px] resize-none text-black rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleSend}
        className="self-end w-fit px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  </div>
</div>
  ) :(
    <div className='min-h-120 flex flex-col items-center justify-center gap-3 bg-background text-foreground'>
      <h1 className='text-2xl'>You are not subscribed to this recipe assistant.</h1>
      <p className='text-xl'>Please subscribe to use this feature.</p>
      {
        user ? (
          <Link href='/checkout' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
            Subscribe Now
          </Link>
        ) : (
          <Link href='/login' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
            Login to Subscribe
          </Link>
        )
      }
    </div>
  )
}
