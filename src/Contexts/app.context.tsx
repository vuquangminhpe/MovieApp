import React, { createContext, useState } from 'react'
import { getLanguageFormLS } from '@/utils/auth'

interface LanguageContextInterface {
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const initialLanguageContext: LanguageContextInterface = {
  language: getLanguageFormLS() || 'en',
  setLanguage: () => undefined
}

export const LanguageContext = createContext<LanguageContextInterface>(initialLanguageContext)

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(initialLanguageContext.language)

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
