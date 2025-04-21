"use client"

import { createContext, useContext, useEffect, useState } from "react";

type Language = 'en' | 'hi' | 'fr';

interface LanguageContextType {
   langauge: Language;
   setLanguage: (lang: Language) => void;   
   t:Record <string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const loadTranslations = async(lang: Language) => {
     try {
      const translation = await import(`../translations/${lang}.json`);
      return translation.default;
     } catch (error) {
         console.error(`Error loading translation for ${lang}:`, error);
         return {};
     }
}

export function LanguageProvider({children}: {children: React.ReactNode}) {
   const [language, setLanguage] = useState<Language>('en');
   const [translations, setTranslations] = useState<Record<string, string>>({});

   useEffect(()=>{
      loadTranslations(language).then(translations => setTranslations(translations));
   },[language])

   return (
      <LanguageContext.Provider value={{ langauge: language, setLanguage, t: translations }}>
         {children}
      </LanguageContext.Provider>
   )
}

export function useLanguage() {
   const context = useContext(LanguageContext);
   if (context === undefined) {
     throw new Error('useLanguage must be used within a LanguageProvider');
   }
   return context;
 } 