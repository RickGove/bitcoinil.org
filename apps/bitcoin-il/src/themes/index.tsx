import * as React from 'react'
import { themes } from '@djitsu/themes'
import type { CompiledTheme, CompiledVariant } from '@djitsu/themes'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import { Button } from 'antd'

const { createContext, useContext, useMemo, useState } = React

const showDebugButton = false
// const showDebugButton = true

const BASE_URL = import.meta.env.BASE_URL || '/'
console.log('Base Path:', [...import.meta.env.BASE_URL?.split('') || []])

console.log('🚨 ENV DUMP:', import.meta.env)

export type ThemeContextValue = [ThemeContextState, ThemeContextActions]
export interface ThemeContextState {
  themes: CompiledTheme[]
  active: {
    theme: string
    variant?: string
    isDark: boolean
  }
  debug: {
    hrefLight?: string
    hrefDark?: string
  }
}
export interface ThemeContextActions {
  setTheme: (theme: string, variant?: string) => void
}
const defaultThemeContext: ThemeContextValue = [
  { themes: [], active: { theme: '', variant: '', isDark: false }, debug: {} },
  { setTheme: () => {} }
]
const ThemeContext = createContext(defaultThemeContext)

type Props = {
  children: JSX.Element
}
const Theme = ({ children }: Props) => {
  const [selectedTheme, selectedVariant] = ['bitil-theme', 'bitil-light']
  const [activeState, setActiveState] = useState({
    theme: selectedTheme,
    variant: selectedVariant,
    isDark: false
  })

  const [showDebug, setShowDebug] = React.useState(false)

  const state = {
    themes,
    active: activeState,
    debug: {}
  }

  const actions = {
    setTheme: (theme: string, variant?: string) => {
      setActiveState((v) => ({ ...v, theme, variant: variant || '' }))
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

  state.debug = { hrefLight, hrefDark, fontHref }

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
        {fontHref && <link rel="stylesheet" href={fontHref} />}
      </Helmet>
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
                actions.setTheme('bitil-theme', 'bitil-dark')
              }}
            >
              Change to Dark
            </Button>
            <Button
              onClick={() => {
                actions.setTheme('bitil-theme', 'bitil-light')
              }}
            >
              Change to Light
            </Button>
          </div>
          <DebugButtons>
            <button onClick={() => setShowDebug(false)}>
              Hide Theme Debug
            </button>
          </DebugButtons>
        </>
      ) : (
        <DebugButtons>
          {showDebugButton ? (
            <button onClick={() => setShowDebug(true)}>Show Theme Debug</button>
          ) : null}
        </DebugButtons>
      )}
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
