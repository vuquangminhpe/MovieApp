export const localStorageEventTarget = new EventTarget()

let cachedLanguage: string | null = null

export const getLanguageFormLS = () => {
  if (cachedLanguage !== null) {
    return cachedLanguage
  }

  const result = localStorage.getItem('language')
  cachedLanguage = result ? JSON.parse(result) : 'en'
  return cachedLanguage
}

export const setLanguageFromLS = (language: string) => {
  cachedLanguage = language
  localStorage.setItem('language', JSON.stringify(language))
  localStorageEventTarget.dispatchEvent(new Event('languageChange'))
}

export const clearLanguageCache = () => {
  cachedLanguage = null
}
