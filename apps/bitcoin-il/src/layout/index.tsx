import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import DevTools from '../components/DevTools'
import Support from '../components/Support'
import {
  currentlySelectedLanguageState,
  isDevModeVisibleState,
  isTooltipShownOnFormattedMessagesHover
} from '../state/state'
import { AppLayoutProps } from '../utils/interfaces'
import Footer from './Footer'
import Header from './Header'

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [keyEvent, setKeyEvent] = React.useState<KeyboardEvent | null>(null)
  const [counters, setCounter] = React.useState({ ctrl: 0, meta: 0 })
  const ln = useRecoilValue(currentlySelectedLanguageState)
  const [isDevModeVisible, setIsDevModeVisible] = useRecoilState(
    isDevModeVisibleState
  )
  const [, setHoverInfo] = useRecoilState(
    isTooltipShownOnFormattedMessagesHover
  )

  // const [initLoadDone, setInitLoadDone] = React.useState(false)

  // const [initLoadDone, setInitLoadDone] = React.useState(true)

  // document.onreadystatechange = () => {
  //   setInitLoadDone(document.readyState === 'complete')
  // }

  // React.useEffect(() => {
  //   document.body.style.opacity = '0'
  //   window.setTimeout(() => {
  //     document.body.style.opacity = '1'
  //   }, 1100)

  //   return () => {
  //     document.body.style.opacity = '0'
  //   }
  // }, [])

  // React.useEffect(() => {
  //   window.addEventListener('beforeunload', fadeOut)
  //   return () => {
  //     window.removeEventListener('beforeunload', fadeOut)
  //   }
  // }, [])

  const fadeOut = (e: any) => {
    // e.preventDefault()
    // e.returnValue = ''
    // document.body.style.opacity = '0'
  }

  const location = useLocation()

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'd') {
        setIsDevModeVisible(!isDevModeVisible)
      }
      if (e.ctrlKey && e.altKey && e.key === 'h') {
        setHoverInfo(true)
      }

      if (e.metaKey) {
        if (counters.meta < 3) {
          setCounter({ ...counters, meta: counters.meta + 1 })
        } else {
          setCounter({ ...counters, meta: 0, ctrl: 0 })
        }
      }
      if (e.ctrlKey && counters.meta >= 2) {
        if (counters.ctrl < 2) {
          setCounter({ ...counters, ctrl: counters.ctrl + 1 })
        } else {
          setHoverInfo((v) => !v)
          setCounter({ ...counters, meta: 0, ctrl: 0 })
        }
      }
    },
    [counters]
  )

  React.useEffect(() => {
    keyEvent && handleKeyDown(keyEvent)
  }, [keyEvent])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeyEvent(e)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const navigate = useNavigate()

  React.useEffect(() => {
    location.pathname === '/developers' ? navigate('/developer') : null
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <AppStyleWrap
      id="app"
      className={`${ln.language === 'he' ? 'dir-rtl' : ''} `}
    >
      <Support />
      <Header />
      {isDevModeVisible ? <DevTools /> : null}
      {children}
      <Footer />
    </AppStyleWrap>
  )
}

export default AppLayout

const AppStyleWrap = styled.div`
  &.invisible {
    opacity: 0;
  }

  h1 {
    line-height: 1.3;
  }

  font-family: 'Titillium Web', sans-serif;
  font-weight: bolder;
  letter-spacing: 0.4px;
`
