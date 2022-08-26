import { Button } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import bitcoinImg from '../img/bitcoin-img.svg'
import instant from '../img/main_ico_instant.svg'
import lowfee from '../img/main_ico_lowfee.svg'
import worldwide from '../img/main_ico_worldwide.svg'
import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { GetStartedWithBitcoinProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import CustomNavLink from './CustomNavLink'
import { FormattedMessage } from './FormattedMessageWithHover'

const GetStartedWithBitcoin: React.FC<GetStartedWithBitcoinProps> = ({}) => {
  return (
    <StyledGetStartedWithBitcoin id="GetStartedWithBitcoin">
      <h1 className="get-started-title">
        <FormattedMessage
          id={`page.home.get-started-title`}
          defaultMessage={`Get Started With Bitcoin`}
          description={`GetStartedWithBitcoin`}
        />
      </h1>
      <div className="get-started-body">
        <div className="get-started-body-top">
          <div className="get-started-body-top-left">
            <p className="get-started-body-top-left-text">
              <FormattedMessage
                id={`page.home.get-started-main-text`}
                defaultMessage={`Bitcoin Il uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system.`}
                description={`Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system.`}
              />
            </p>
            <div className="get-started-icons-and-words">
              <div className="get-started-body-top-left-detail">
                <img src={instant} />
                <FormattedMessage
                  id={`page.home.get-started.instant`}
                  defaultMessage={`Fast peer-to-peer transactions`}
                  description={`Fast peer-to-peer transactions`}
                />
              </div>
              <div className="get-started-body-top-left-detail">
                <img src={worldwide} />
                <FormattedMessage
                  id={`page.home.get-started.worldwide`}
                  defaultMessage={`Worldwide Payments`}
                  description={`Worldwide Payments`}
                />
              </div>
              <div className="get-started-body-top-left-detail">
                <img src={lowfee} />
                <FormattedMessage
                  id={`page.home.get-started.lowfee`}
                  defaultMessage={`Low Processing Fees`}
                  description={`Low Processing Fees`}
                />
              </div>
            </div>
          </div>
          <div className="get-started-body-top-right">
            <img src={bitcoinImg} />
          </div>
        </div>
        <div className="get-started-body-bottom">
          <CustomNavLink to="/getting-started">
            <SiteButton type="primary" size="large">
              <FormattedMessage
                id={`exchanges.getting-stared-label`}
                defaultMessage={`Get Started with BitCoin Il`}
                description={`getting-stared-label`}
              />
            </SiteButton>
          </CustomNavLink>
        </div>
      </div>
    </StyledGetStartedWithBitcoin>
  )
}

export default GetStartedWithBitcoin

const StyledGetStartedWithBitcoin = styled.div`
  .get-started {
    &-title {
      font-size: 50px;
      color: ${colors.accent};
      padding-top: 30px;

      ${phoneDevices} {
        font-size: 35px;
      }
    }

    &-icons-and-words {
      padding: 50px 0;

      font-size: 18px;

      div {
        margin-bottom: 30px;
      }
    }

    &-body {
      ${phoneDevices} {
        text-align: center;
      }
      &-top {
        display: flex;
        ${phoneDevices} {
          flex-direction: column-reverse;
        }

        &-left,
        &-right {
          width: 45vw;
          ${phoneDevices} {
            width: 95vw;
          }
        }
        &-left {
          padding: 30px;
          ${phoneDevices} {
            width: 100vw;
          }

          &-detail {
            img {
              height: 30px;
              margin-right: 30px;
            }
          }

          &-text {
            font-size: 20px;
          }
        }
        &-right {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 90vw;

            ${phoneDevices} {
              max-width: 60vw;
            }
          }
        }
      }
      &-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 60px;
      }
    }
  }
`
