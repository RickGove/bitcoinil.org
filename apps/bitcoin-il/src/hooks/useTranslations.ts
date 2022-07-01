import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { AvailableLanguage, Messages } from '../Interfaces'
import { currentlySelectedLanguage } from '../state/state'

export const useTranslations = () => {
  const [language] = useRecoilState(currentlySelectedLanguage)
  const [locale, setLocale] = React.useState('en')
  const navigate = useNavigate()

  const navigateWithLanguageChange = (path: string, newLang?: string) => {
    if (newLang === 'en') {
      navigate(path.substring(3))
    } else {
      navigate(`${newLang}${path}`)
    }
  }

  React.useEffect(() => {
    if (language.language === 'he') setLocale('il')
    setLocale(language.language)
  }, [language.language])

  const availableLanguages: AvailableLanguage[] = [
    { name: 'en', icon: '🇬🇧', locale: 'en', longName: 'English' },
    { name: 'he', icon: '🇮🇱', locale: 'il', longName: 'עִברִית' }
  ]
  return {
    availableLanguages,
    locale,
    navigateWithLanguageChange
  }
}
