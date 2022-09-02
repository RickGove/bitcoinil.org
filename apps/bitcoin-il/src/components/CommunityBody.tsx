import * as React from 'react'
import styled from 'styled-components'

import { useCommunityData } from '../data/CommunityBodyData'
import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { CommunityBodyProps } from '../utils/interfaces'
import CardsDisplay from './CardsDisplay'
import { FormattedMessage } from './FormattedMessageWithHover'

const CommunityBody: React.FC<CommunityBodyProps> = ({}) => {
  const [conf, items] = useCommunityData()

  // console.log('Communities Data:', { conf, items })

  const communityCards = React.useMemo(() => {
    const cards = Object.entries(items.cards).reduce(
      (cardsAcc, [cardId, cardData]) => {
        // console.log('We check card:', `id="${cardId}"`,cardData)

        const card = {
          img: conf[cardId].icon,
          title: (
            <FormattedMessage
              id={`communities.config.${cardId}.name`}
              defaultMessage={'Forums'}
              description={`communities.config.${cardId}.name`}
            />
          ),

          text: (
            <ul className="list-of-links">
              {Object.entries(
                cardData as Record<string, Record<string, string>>
              ).map(([key, value]) => {
                return (
                  <li key={key}>
                    <a href={value.url}>{value.name}</a>
                  </li>
                )
              })}
            </ul>
          ),

          id: 'mobile'
        }
        return [...cardsAcc, card]
      },
      [] as any[]
    )
    // console.log('Reduced cards:', cards)

    return cards
  }, [items, conf])
  // console.log('Cards:', communityCards)

  return (
    <StyledCommunityBody id="CommunityBody">
      <CardsDisplay cards={communityCards} />
      {/* <Divider />
      <div className="npos">
        <h1>
          <FormattedMessage
            id={`exchanges.non-profit.title`}
            defaultMessage={`Non-profit Organizations`}
            description={`non-profit.title`}
          />
        </h1>
        <div className="npos-list">
          {NonProfitOrgs.map((npo, i) => {
            return (
              <div className="npo" key={`npo-${i}`}>
                <span className="flag">{npo.flag}</span>
                <div className="country-wrap">
                  <span className="country">{npo.country}</span>
                  {npo.links.map((link, i) => {
                    return (
                      <a className="link" href={link.linkHref}>
                        {link.linkText}
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className="visit-community">
            <FormattedMessage
              id={`community.visit`}
              defaultMessage={`Visit the`}
              description={`visit`}
            />
            {'   '}
            <CustomNavLink to="/community">
              <FormattedMessage
                id={`community.visit.link`}
                defaultMessage={`Community portal`}
                description={`visit.link`}
              />
            </CustomNavLink>
            {'   '}
            <FormattedMessage
              id={`community.visit.post-link`}
              defaultMessage={`on the wiki.`}
              description={`visit.post-link`}
            />
          </div>
        </div>
      </div> */}
    </StyledCommunityBody>
  )
}

export default CommunityBody

const StyledCommunityBody = styled.div`
  margin-bottom: 150px;

  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;

    ${phoneDevices} {
      padding: 0;
    }
  }

  .npos {
    &-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 80vw;
      margin: auto;
    }

    h1 {
      color: ${colors.accent};
      text-align: center;
      font-weight: bolder;
    }
  }

  .npo {
    margin: 25px;
    display: flex;

    .flag {
      font-size: 60px;
    }

    .country-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;

      .country {
        font-size: 20px;
      }

      .link {
        font-size: 16px;
      }
    }
  }

  .visit-community {
    font-size: 20px;

    a {
      color: ${colors.accent};
    }
  }
`
