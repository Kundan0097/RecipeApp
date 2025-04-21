import { useLanguage } from '@/context/LanguageContext'
import React from 'react'

function LanguageSwitcher() {
   const {langauge ,setLanguage} = useLanguage()
  return (
    <div>
      <select value={langauge}
       onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'fr')}
       fdprocessedid="702cwn"
       className="text-white  border border-gray-500 rounded-md px-2 py-1 bg-gray-900">
         <option value="en">English</option>
         <option value="hi">Hindi</option>
         <option value="fr">French</option>  

      </select>
    </div>
  )
}

export default LanguageSwitcher