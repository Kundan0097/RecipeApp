"use client"
import { useAuth } from '@/app/firebase/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { FiClock, FiHeart, FiAward } from 'react-icons/fi';

const HeroSection = () => {
  const  { message } = useAuth()
  const {t} = useLanguage()
  return (
    <section className="relative h-screen max-h-[800px] w-full overflow-hidden">
      
      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center ">
        <div className="mb-6 flex space-x-4">
          <span className="flex items-center text-sm font-medium md:text-base">
            <FiClock className="mr-2" /> 1000+ {t.qucikrecipies}
          </span>
          <span className="flex items-center text-sm font-medium md:text-base">
            <FiHeart className="mr-2" />{t.chefApproved}
          </span>
          <span className="flex items-center text-sm font-medium md:text-base">
            <FiAward className="mr-2" /> {t.awardWinning}
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          <span className="block">{t.craftculnary}</span>
          <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            {t.masterpieces}
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
          {t.recpiePara}
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="relative">
            <input
              type="text"
              // fdprocessedid="jtm94u"
              placeholder="Search 15,000+ recipes (Try 'Chicken Alfredo' or 'Vegan Desserts')..."
              className="w-full rounded-full border-2 border-amber-400/30 bg-white/90 px-6 py-4 text-gray-800 shadow-lg backdrop-blur-sm placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/50"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-amber-500 px-6 py-2 font-medium text-white transition-all hover:bg-amber-600 hover:shadow-md " >
              {t.search}
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            🍳 50,000+ {t.happyCooks}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            🌍 {t.recpiesfrom} 25+ {t.countries}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            ⭐ 4.9/5 (2K+ {t.reviews})
          </span>
        </div>
      </div>

      
        <div className='absolute top-10 right-10'>
        {
         message ? <p className='bg-green-700 text-white px-4 py-2 rounded'>{message}</p> : ""
        }
        </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-amber-400"></div>
      </div>
    </section>
  );
};

export default HeroSection;