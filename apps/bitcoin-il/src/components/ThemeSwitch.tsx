import { Divider, Switch } from 'antd'
import * as React from 'react'
import { DarkModeToggle } from 'react-dark-mode-toggle-2'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { isDarkModeState } from '../state/state'
import { useTheme } from '../theme'
import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { ThemeSwitchProps } from '../utils/interfaces'

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isMobile }) => {
  const [isSystem, setIsSystem] = React.useState(false)
  const isDark = useRecoilValue(isDarkModeState)

  const [, actions] = useTheme()

  const toggleSystem = React.useMemo(() => {
    return (
      <Switch
        checked={isSystem}
        checkedChildren="System"
        unCheckedChildren="Manual"
        onChange={(v) => {
          setIsSystem(v)
          if (v) {
            actions.setTheme('bitil-theme')
          }
        }}
        defaultChecked
      />
    )
  }, [isSystem])

  const toggleSize = isMobile ? 100 : 50

  return (
    <StyledThemeWrap
      id="StyledThemeWrap"
      style={{
        background: isMobile
          ? isDark
            ? colors.burgerMenuSubBgDark
            : colors.burgerMenuSubBgLight
          : 'transparent',
        color: isDark ? '' : 'black'
      }}
    >
      {isMobile ? (
        <span className="theme-mobile-sub-title">Dark Mode</span>
      ) : null}
      {isSystem ? (
        <>
          <DarkModeToggle
            onChange={() => {
              setIsSystem(!isSystem)
              actions.toggleDarkMode()
            }}
            isDarkMode={isDark}
            size={toggleSize}
          />
        </>
      ) : (
        <DarkModeToggle
          onChange={() => {
            actions.toggleDarkMode()
          }}
          isDarkMode={isDark}
          size={toggleSize}
        />
      )}
      <span
        className="system-switch"
        onClick={() => {
          if (isSystem) {
            actions.setTheme('bitil-theme')
          }
          setIsSystem(!isSystem)
        }}
      >
        {isMobile ? (
          <>
            <Divider />
            <span className="theme-mobile-sub-title">
              Switch to {isSystem ? 'manaual' : 'system'} theme control
            </span>
          </>
        ) : null}
        <span className="system-icon-font">{isSystem ? '🖖' : '🖥️'}</span>
      </span>
    </StyledThemeWrap>
  )
}

export default ThemeSwitch

const StyledThemeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .theme-wrap-inner {
    background: ${colors.burgerMenuSubBgLight};
    color: black;
  }

  .theme-wrap-inner-dark {
    background: ${colors.burgerMenuSubBgDark};
    span {
      color: black;
    }
  }

  .mobile-theme-light {
    background: ${colors.burgerMenuSubBgLight};
    span {
      color: black;
    }
  }

  .system-switch {
    cursor: pointer;
    font-size: 20px;
    margin-left: 12px;
  }

  ${phoneDevices} {
    flex-direction: column;
    padding: 20px 0;

    .anticon {
      background: grey;
      margin-left: 50px;
    }

    .system-switch {
      display: flex;
      flex-direction: column;

      .system-icon-font {
        ${phoneDevices} {
          font-size: 35px;
        }
      }
    }
  }
`
