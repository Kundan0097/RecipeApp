import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./firebase/AuthContext";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Recipie",
    template: "%s | Recipie",
  },
  description: "This is best Recipie Finder Website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} >

        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <LanguageProvider>
            <AuthProvider>
              <BookmarkProvider>
                <main >
                  <Navbar />
                  {children}
                  <ToastContainer position="bottom-right" autoClose={3000} />
                </main>
                <Footer />
              </BookmarkProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
