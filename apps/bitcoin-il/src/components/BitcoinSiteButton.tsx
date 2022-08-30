import { Button } from 'antd'
import * as React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { SiteButtonProps } from '../utils/interfaces'

// /////////////////////
// Main Function

export default function SiteButton({
  onClick = () => {},
  children,
  type = 'default',
  background,
  color,
  href,
  buttonLinkWrapUrl,
  buttonLinkId,
  style,
  size
}: SiteButtonProps) {
  return (
    <StyledButton
      id="SiteButton"
      style={{
        color: color ? color : '',
        background: background ? background : '',
        border: background ? `2px solid ${background}` : '',
        ...style
      }}
      href={href}
      type={type}
      onClick={!buttonLinkWrapUrl ? () => onClick() : undefined}
    >
      <LinkFromProps buttonLinkId={buttonLinkId} makeATag={buttonLinkWrapUrl}>
        {children}
      </LinkFromProps>
    </StyledButton>
  )
}

// ////////////////////////////
//
//   Helper Function
function LinkFromProps<T>(props: {
  makeATag: any
  children: (values: T) => JSX.Element
  buttonLinkId?: string
}) {
  const intl = useIntl()

  if (!props.makeATag) {
    return props.children
  }

  return (
    <a
      href={intl.formatMessage({
        id: `${props.buttonLinkId}.url`,
        defaultMessage: `${props.makeATag}`
      })}
    >
      {props.children}
    </a>
  )
}

const StyledButton = styled(Button)`
  &.ant-btn {
    padding: 25px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--activity-bar-foreground);
    font-size: 18px;

    &-primary {
      color: white;
    }

    &-default {
      background: var(--button-foreground);
    }
  }
`
