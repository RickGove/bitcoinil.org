import * as React from 'react'
import styled from 'styled-components'
import { devItems } from '../data/DevelopersData'

import { phoneDevices } from '../utils/breakpoints'
import { DevelopersProps, tableOfContentItem } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'
import StickyTOC from './StickyTOC'

const Developers: React.FC<DevelopersProps> = ({}) => {
  return (
    <StyledDevelopers id="Developers">
      <h1 className="padded-heading-1">
        <FormattedMessage
          id={`exchanges.developers.heading`}
          defaultMessage={`All of the resources and information regarding bitcoin development as accessible on the original developer.bitcoin.org website and is highly recommended resource if you want to learn how to interact with the Bitcoin or Bitcoin Israel blockchain, construct valid transaction, and create compatible wallets and other software.`}
          description={`developers.heading`}
        />
      </h1>
      <StickyTOC categories={devItems} itemsOrganized={true} />
    </StyledDevelopers>
  )
}

export default Developers

const StyledDevelopers = styled.div`
  .padded-heading-1 {
    padding: 200px;
    text-align: center;
    ${phoneDevices} {
      padding: 30px;
    }
  }

  .title-p {
    /* p { */
    font-size: 21px !important;
    /* background: red; */
    /* } */
  }

  p {
    margin: 0;
  }
`
