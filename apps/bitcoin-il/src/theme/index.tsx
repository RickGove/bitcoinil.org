import { themes } from '@djitsu/themes'
import { Button } from 'antd'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled, { createGlobalStyle } from 'styled-components'

import { isDarkModeState, isThemeDebugVisibleState } from '../state/state'
import { ThemeContextValue } from '../utils/interfaces'
import FaviconHandler from './favicon'

import type { CompiledTheme, CompiledVariant } from '@djitsu/themes'
import { useFade } from '../hooks/useFade'
const { createContext, useContext, useMemo, useState } = React

const BASE_URL = import.meta.env.BASE_URL || '/'

const defaultThemeContext: ThemeContextValue = [
  { themes: [], active: { theme: '', variant: '', isDark: false }, debug: {} },
  {
    setTheme: () => {},
    toggleDarkMode: () => {},
    getUserThemePreferenceFromLocalStorage: () => {},
    storeCurrentThemeToLocalStorage: () => {},
    setThemeWithFade: () => {}
  }
]
const ThemeContext = createContext(defaultThemeContext)

type Props = {
  children: JSX.Element
}

const Theme = ({ children }: Props) => {
  const [selectedTheme, selectedVariant] = ['bitil-theme', '']
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState)
  const [activeState, setActiveState] = useState({
    theme: selectedTheme,
    variant: selectedVariant,
    isDark: false
  })

  const showDebug = useRecoilValue(isThemeDebugVisibleState)
  const [prefersDark, setPrefersDark] = React.useState(false)

  const { disappearReappearHTMLElement: disappearReappear } = useFade()

  const isPrefersDarkInitial = useMemo(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode
      return true
    }
    return false
  }, [])

  React.useEffect(() => {
    const handler = (event: any) => {
      const newColorScheme = event.matches ? 'dark' : 'light'
      setPrefersDark(newColorScheme === 'dark')
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handler)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handler)
    }
  }, [])

  const state = {
    themes,
    active: activeState,
    debug: {}
  }

  const pullThemeInfo = (theme: string, variant?: string) => {
    const themeIndex = themes.findIndex((item) => item.name === theme)
    const variantIndex = variant
      ? themes[themeIndex].variants.findIndex(
          (item: { name: string }) => item.name === variant
        )
      : null
    return variant
      ? themes[themeIndex].variants[variantIndex]
      : themes[themeIndex]
  }

  React.useEffect(() => {
    const { theme, variant } = actions.getUserThemePreferenceFromLocalStorage()

    if (theme && variant) {
      actions.setThemeWithFade(theme, variant)
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setIsDarkMode(true)
        actions.setThemeWithFade('bitil-theme', 'bitil-dark', 300)
      } else {
        actions.setThemeWithFade('bitil-theme', 'bitil-light', 300)
        setIsDarkMode(false)
      }
    }
  }, [])

  React.useEffect(() => {
    if (isDarkMode === state.active.isDark) {
      return
    }
    setIsDarkMode(state.active.isDark)
  }, [state, isDarkMode])

  const actions = {
    setTheme: (theme: string, variant?: string) => {
      const newState = {
        theme,
        variant: variant ? variant : '',
        isDark: pullThemeInfo(theme, variant).isDark
      }
      actions.storeCurrentThemeToLocalStorage(theme, variant)
      setActiveState(newState)
    },
    setThemeWithFade: (
      theme: string,
      variant?: string,
      fadeTime: number = 600
    ) => {
      disappearReappear(document.body, fadeTime, fadeTime, () => {
        const newState = {
          theme,
          variant: variant ? variant : '',
          isDark: pullThemeInfo(theme, variant).isDark
        }
        actions.storeCurrentThemeToLocalStorage(theme, variant)
        setActiveState(newState)
      })
    },
    storeCurrentThemeToLocalStorage: (
      theme: string,
      variant: string | undefined
    ) => {
      window.localStorage.setItem('theme', theme)
      window.localStorage.setItem('variant', variant ? variant : '')
    },
    getUserThemePreferenceFromLocalStorage: () => {
      return {
        theme: window.localStorage.getItem('theme'),
        variant: window.localStorage.getItem('variant')
      }
    },
    toggleDarkMode: () => {
      isDarkMode
        ? actions.setThemeWithFade('bitil-theme', 'bitil-light')
        : actions.setThemeWithFade('bitil-theme', 'bitil-dark')
    }
  }

  const [hrefLight, hrefDark] =
    useMemo(() => {
      const theme = themes.find(
        ({ name }: CompiledTheme) => state.active.theme === name
      )
      if (!theme) return null

      if (!state.active.variant) {
        const variantLight = theme.variants.find(
          ({ isDark }: CompiledVariant) => !isDark
        )
        const variantDark = theme.variants.find(
          ({ isDark }: CompiledVariant) => isDark
        )
        return [
          variantLight && `${BASE_URL}themes/${variantLight.css}`,
          variantDark && `${BASE_URL}themes/${variantDark.css}`
        ]
      }
      const variant = theme?.variants.find(
        ({ name }: CompiledVariant) => state.active.variant === name
      )

      if (!variant) return null

      return [`${BASE_URL}themes/${variant.css}`]
    }, [state.active.variant, state.active.theme]) || []

  const fontHref = useMemo(() => {
    const theme = themes.find(
      ({ name }: CompiledTheme) => state.active.theme === name
    )
    if (!theme) return null

    return theme.fontStylesheet
  }, [state.active.theme])

  state.debug = {
    activeState,
    hrefLight,
    hrefDark,
    fontHref,
    prefersDark,
    isPrefersDarkInitial
  }

  return (
    <ThemeContext.Provider value={[state, actions]}>
      <Helmet>
        {hrefLight && (
          <link
            rel="stylesheet"
            href={hrefLight}
            media={hrefDark && '(prefers-color-scheme: light)'}
          />
        )}
        {hrefDark && (
          <link
            rel="stylesheet"
            href={hrefDark}
            media="(prefers-color-scheme: dark)"
          />
        )}
        {/* Check if fontHref is array */}
        {fontHref &&
          (Array.isArray(fontHref) ? (
            fontHref.map((fh) => (
              <link key={'font-href ' + fh} rel="stylesheet" href={fh} />
            ))
          ) : (
            <link rel="stylesheet" href={fontHref} />
          ))}
      </Helmet>

      <FaviconHandler />

      {showDebug ? (
        <>
          <GlobalStyle />
          <div className="themer">
            <h1>DEBUG: </h1>
            <pre>{JSON.stringify(state.debug, null, 2)}</pre>
            <h2>This is theme stuff</h2>
            <h1>Current Theme</h1>
            <pre>{JSON.stringify(activeState, null, 2)}</pre>
            <Button type="primary">IMMA BUTTON</Button>

            <pre>{JSON.stringify(themes, null, 2)}</pre>
            <Button
              onClick={() => {
                actions.setThemeWithFade('bitil-theme', 'bitil-dark')
              }}
            >
              Change to Dark
            </Button>
            <Button
              onClick={() => {
                actions.setThemeWithFade('bitil-theme', 'bitil-light')
              }}
            >
              Change to Light
            </Button>
          </div>
        </>
      ) : null}
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

const DebugButtons = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.2;
  z-index: 96;

  button {
    cursor: pointer;
    background: black;
    color: white;
    padding: 30px;
  }

  &:hover {
    opacity: 1;
  }
`

const GlobalStyle = createGlobalStyle`
  html body {
    /* background: none; */
  }
`

export default Theme
