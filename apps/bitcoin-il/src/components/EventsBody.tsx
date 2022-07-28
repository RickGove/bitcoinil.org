import { Divider } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { phoneDevices } from '../utils/breakpoints'
import { EventsBodyProps } from '../utils/interfaces'
import SiteButton from './BitcoinSiteButton'
import { FormattedMessage } from './FormattedMessageWithHover'

const EventsBody: React.FC<EventsBodyProps> = ({}) => {
  const [showMoreEvents, setShowMoreEvents] = React.useState(false)

  return (
    <StyledEventsBody id="EventsBody">
      <h1>
        <FormattedMessage
          id={`events.heading`}
          defaultMessage={`Upcoming Events and Conferences`}
          description={`heading`}
        />
      </h1>
      <SiteButton
        background="black"
        color="white"
        onClick={() => setShowMoreEvents(!showMoreEvents)}
      >
        {showMoreEvents ? 'Hide More Events' : 'Show More Events'}
      </SiteButton>
      <div
        className={`more-events ${showMoreEvents ? 'expanded' : 'minimized'}`}
      >
        No Recent Events
      </div>
      <Divider />
      <div className="events-footer">
        <div className="events-footer-left">
          <a href="bitcoin.meetup.com">
            <FormattedMessage
              id={`events.link-0`}
              defaultMessage={`BitCoin Meetup Groups`}
              description={`link-0`}
            />
          </a>
        </div>
        <div className="events-footer-right">
          <SiteButton
            type="primary"
            onClick={() => console.log('Handle New Event Submitted')}
          >
            Submit New Event
          </SiteButton>
        </div>
      </div>
    </StyledEventsBody>
  )
}

export default EventsBody

const StyledEventsBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  h1 {
    color: ${colors.accent};
    margin: 100px 0;
    font-weight: bolder;
  }

  .more-events {
    overflow: hidden;
  }

  .expanded {
    height: auto;
  }

  .minimized {
    height: 0;
  }

  .events-footer {
    margin: 100px 0;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    width: 100vw;

    &-left {
      font-size: 18px;
    }

    ${phoneDevices} {
      flex-direction: column;
    }
  }
`
