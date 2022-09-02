import * as React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { useExchanges } from '../data/ExchangesBodyData'
import ico_badge from '../img/ico_badge.svg'
import { isDarkModeState } from '../state/state'
import { colors } from '../theme/colors'
import { phoneDevices, smallDevices } from '../utils/breakpoints'
import { ExchangesBodyProps } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'
import StickyTOC from './StickyTOC'

const ExchangesBody: React.FC<ExchangesBodyProps> = ({}) => {
  const dark = useRecoilValue(isDarkModeState)
  const exchanges = useExchanges()

  // console.log('loaded exchanges', exchanges)

  console.log(exchanges)

  return (
    <StyledExchangesBody id="ExchangesBody">
      <div
        className={`exchanges-warning ${
          dark ? 'dark-exchanges-warning' : 'light-exchanges-warning'
        }`}
      >
        <img src={ico_badge} />
        <FormattedMessage
          id={`exchanges.warning`}
          defaultMessage={` Note: Exchanges provide highly varying degrees of safety, security,
         privacy, and control over your funds and information. Perform your own
         due diligence and choose a wallet where you will keep your bitcoin
         before selecting an exchange.`}
          description={`exhcnages-warning`}
        />
      </div>
      <StickyTOC categories={exchanges} />
    </StyledExchangesBody>
  )
}

export default ExchangesBody

const StyledExchangesBody = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;

  .sticky .exchanges-left {
    position: fixed;
    top: 0;
    overflow-y: scroll;
    height: 100vh;
  }

  .sticky .exchanges-right-desktop {
    margin-left: 35vw;
  }

  .unsticky {
  }

  li {
    list-style: none;
  }

  #style-5::-webkit-scrollbar {
    display: none;
  }

  .exchanges-columns {
    display: flex;
    margin-bottom: 40px;
  }

  .exchanges-right-desktop {
    width: calc(90vw - 500px);

    ${phoneDevices} {
      display: none;
    }
  }

  .exchanges-right-mobile {
    ${smallDevices} {
      display: none;
    }
  }

  .exchanges-warning {
    background: #fff9f3;
    padding: 60px;

    border: none;
    margin: auto;
    margin-top: 50px;
    width: 50vw;
    display: flex;
    font-size: 16px;
    color: black;

    ${phoneDevices} {
      flex-direction: column;
      width: 90vw;

      img {
        height: 100px;
        margin-bottom: 40px;
      }
    }

    &.dark-exchanges-warning {
      background-color: black;
      color: white;
    }

    &.light-exchanges-warning {
    }

    img {
      margin-right: 30px;

      ${phoneDevices} {
        margin-right: 0;
      }
    }

    ${phoneDevices} {
      padding: 10px;
    }
  }

  .exchanges-left {
    &.dark-exchanges-left {
      background: black;
    }
    &.light-exchanges-left {
      background: white;
    }
    width: 35vw;
    font-size: 20px;
    border-right: 1px solid #b9b9c350;
    background: #282c34;
    z-index: 1;
  }

  li {
    margin-bottom: 10px;
  }

  .right {
    ${phoneDevices} {
      width: 95vw;
    }

    li {
      padding: 25px;
      border-bottom: 1px solid #b9b9c350;

      &.li-no-border-bottom {
        border-bottom: 0;
      }
    }

    h3 {
      color: ${colors.accent};
      font-size: 25px;
      font-weight: bolder;
    }

    p {
      font-size: 18px;
    }
  }

  .dict-word-link {
    cursor: pointer;

    margin: 0;

    transition: opacity 400ms;
    &:hover {
      transition: opacity 400ms;
      opacity: 0.6;
    }
  }

  .scroll-end-detect {
    background: transparent;
    z-index: 999999999999;
    width: 95vw;
    visibility: hidden;
  }

  h4 {
    color: ${colors.accent};
    font-weight: bolder;
    font-size: 20px;
    margin-left: 50px;
  }

  .city-label {
    font-size: 25px;
  }

  .country-label {
    font-size: 33px;
  }

  .country-flag {
    font-size: 45px !important;
    margin-right: 10px;
  }

  .cities-wrap {
    display: flex;
  }
`
