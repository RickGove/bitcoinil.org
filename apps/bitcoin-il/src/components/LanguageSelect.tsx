import { Menu } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { useTranslations } from '../hooks/useTranslations'
import ico_globe from '../img/ico_globe.png'
import { currentlySelectedLanguageState } from '../state/state'
import { phoneDevices } from '../utils/breakpoints'
import { LanguageSelectProps } from '../utils/interfaces'

const LanguageSelect: React.FC<LanguageSelectProps> = ({}) => {
  const [current, setCurrent] = React.useState('en')

  const [languageState, setLanugageState] = useRecoilState(
    currentlySelectedLanguageState
  )

  const intl = useTranslations()
  const { availableLanguages, navigateWithLanguageChange } = intl

  const location = useLocation()
  const { generateLanguageMenuItems } = useTranslations()

  React.useEffect(() => {
    availableLanguages.forEach((avLang) => {
      if (location.pathname.startsWith(`/${avLang.name}`)) {
        setCurrent(avLang.name)
        setLanugageState({ language: avLang.name })
      }
    })
  }, [])

  function onClick(e: any) {
    console.log(e)

    if (languageState.language === e.key) return null
    setCurrent(e.key)
    setLanugageState({ language: e.key })
    navigateWithLanguageChange(location.pathname, e.key)
  }

  return (
    <StyledLanguageSelect id="LanguageSelect">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={generateLanguageMenuItems()}
      />
    </StyledLanguageSelect>
  )
}

const StyledLanguageSelect = styled.div`
  ${phoneDevices} {
    display: none;
  }

  .ant-menu-submenu-title {
    height: 25px;
    width: 25px;
    background-image: url(${ico_globe});
    background-size: cover;
    padding-left: 25px;
    display: flex;
    align-items: center;

    span {
      padding-left: 30px;
    }

    #app.dir-rtl & span {
      padding-left: 0;
      padding-right: 30px;
    }
  }

  .collapsable-menu {
    &:hover .language-select-down-arrow {
      transition: transform 200ms;
      transform: rotate(180deg);
    }
    .language-select-down-arrow {
      transition: transform 200ms;
    }
  }

  .ant-menu {
    width: 100px;
    &.ant-menu {
      background: transparent;
      border-bottom: none;
    }

    &-item {
    }

    p {
      margin: 0;
    }

    > li {
      &::after {
        width: 0;
        height: 0;
      }
      &.ant-menu-item {
        &::after {
          width: 0;
          height: 0;
        }
      }
    }
  }
`

export default LanguageSelect
