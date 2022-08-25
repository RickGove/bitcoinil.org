import * as React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { boxes } from '../data/QuickOverviewData'
import OverviewBG from '../img/overview-bg.svg'
import OverviewBGLight from '../img/overview-bg-light.svg'

import { isDarkModeState } from '../state/state'
import { largeDevices, phoneDevices } from '../utils/breakpoints'
import { QuickOverviewBoxProps } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'
import QuickOverviewBox from './QuickOverviewBox'

export default function QuickOverview(): JSX.Element {
  const baseFormattedMessageId: String = 'page.home.quick-overview'

  const isDarkMode = useRecoilValue(isDarkModeState)

  return (
    <StyledQuickOverview id="QuickOverview">
      <div
        className={`quick-overview ${
          isDarkMode ? 'quick-overview-dark' : 'quick-overview-light'
        }`}
      >
        <h1>
          <FormattedMessage
            id={`${baseFormattedMessageId}.title`}
            defaultMessage={`Get A Quick Overview For`}
            description={`QuickOverview`}
          />
        </h1>
        <div
          className={`quick-overview-boxes ${
            isDarkMode ? 'qob-dark' : 'qob-light'
          }`}
        >
          {boxes.map((boxInfo: QuickOverviewBoxProps, i: number) => {
            const {
              imgSrc,
              index,
              id,
              titleDefaultMessage,
              titleDescription,
              subtitleDefaultMessage,
              subtitleDescription,
              link
            } = boxInfo
            return (
              <QuickOverviewBox
                key={i}
                index={index}
                imgSrc={imgSrc}
                id={id}
                isDarkMode={isDarkMode}
                titleDefaultMessage={titleDefaultMessage}
                titleDescription={titleDescription}
                subtitleDefaultMessage={subtitleDefaultMessage}
                subtitleDescription={subtitleDescription}
                baseFormattedMessage={baseFormattedMessageId}
                link={link}
              />
            )
          })}
        </div>
      </div>
    </StyledQuickOverview>
  )
}

const StyledQuickOverview = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  padding: 0 0 60px 0;
  background-size: cover;
  width: 100%;

  .quick-overview {
    padding-top: 150px;
    background-size: cover;
  }

  .quick-overview-dark {
    background: url(${OverviewBG}) top no-repeat;
    background-size: cover;
  }

  .quick-overview-light {
    h1 {
      color: black;
    }
    background: url(${OverviewBGLight}) top no-repeat;
    background-size: cover;
  }

  h1 {
    ${phoneDevices} {
      margin-top: 100px;
    }

    color: white;
  }

  .quick-overview-boxes {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-bottom: 60px;

    ${phoneDevices} {
      a {
        margin-bottom: 20px;
      }
    }

    ${largeDevices} {
      flex-direction: row;
    }
  }

  .qob-dark {
    background: #3e3e3e;
  }
  .qob-light {
    background: #c6d0df;
  }
`
