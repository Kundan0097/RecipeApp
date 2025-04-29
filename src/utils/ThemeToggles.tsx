// components/ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 rounded bg-background  text-foreground cursor-pointer border border-gray-500 font-bold hover:bg-gray-500"
    >
      {theme === "dark" ? "🌞Light" : "🌙Dark"}
    </button>
  )
}