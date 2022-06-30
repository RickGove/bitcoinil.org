import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import { phoneDevices } from './breakpoints'
import { useTranslations } from './hooks/useTranslations'

export default function HomepageButtons(): JSX.Element {
  const { customNavigate } = useTranslations()
  return (
    <StyledHomepageButtons>
      <div className="homepage-buttons">
        <SiteButton
          onClick={() => {
            // navigate('/getting-started')
            customNavigate('/getting-started')
          }}
          type="primary"
        >
          <FormattedMessage
            id={`homepage.get-started-button`}
            defaultMessage={`Get Started With BitCoin Il`}
            description={`Get Started`}
          />
        </SiteButton>
        <SiteButton
          onClick={() => {
            customNavigate('/choose-your-wallet')
            // navigate('/choose-your-wallet')
          }}
          type="default"
        >
          <FormattedMessage
            id={`homepage.choose-your-wallet`}
            defaultMessage={`Choose Your Wallet`}
            description={`Choose Wallet`}
          />
        </SiteButton>
        <SiteButton
          onClick={() => {
            // navigate('/buy')
            customNavigate('/buy')
          }}
          type="default"
        >
          <FormattedMessage
            id={`homepage.buy-bitcoin`}
            defaultMessage={`Buy Bitcoin`}
            description={`Buy`}
          />
        </SiteButton>
      </div>
    </StyledHomepageButtons>
  )
}

const StyledHomepageButtons = styled.div`
  .homepage-buttons {
    display: flex;

    .ant-btn {
      width: 285px;
      font-weight: bolder;
      font-size: 16px;
    }

    button {
      margin-right: 10px;
    }

    ${phoneDevices} {
      flex-direction: column;

      button {
        margin-bottom: 10px;
      }
    }
  }
`
