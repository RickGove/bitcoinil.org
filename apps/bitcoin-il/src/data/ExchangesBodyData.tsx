import * as React from 'react'
import { useIntl } from 'react-intl'

export const useExchanges = () => {
  const intl = useIntl()

  const config = React.useMemo(() => {
    const baseConf = Object.entries(intl.messages).filter(([v]) =>
      v.match(/^exchanges\.config\./)
    )

    return baseConf.reduce((acc, [k, v]) => {
      const [, , key] = k.split('.')

      return {
        ...acc,
        [key]: v
      }
    }, {})
  }, [intl.messages])
  // console.log('Whats config', config)

  const list = React.useMemo(() => {
    const base = Object.entries(intl.messages).filter(([v]) =>
      v.match(/^exchanges\.exchange\./)
    )
    // console.log('whats the base?', base)
    const domains = base.reduce((domainsAcc, [k, v]) => {
      const ks = k.split('.')
      const domain = ks[2] as string
      // console.log('Domain', domain)
      const region = ks[3]
      // console.log('Region', region)

      const obj = ks[4]

      const key = ks[5]
      return {
        ...domainsAcc,
        [domain]: {
          ...(domainsAcc[domain] || {}),
          [region]: {
            ...(domainsAcc?.[domain]?.[region] || {}),
            [obj]: {
              ...(domainsAcc?.[domain]?.[region]?.[obj] || {}),
              [key]: v
            }
          }
        }
      }
    }, {} as Record<string, any>)
    // console.log('whats the domains?', domains)
    return domains
  }, [intl.messages])

  // console.log("What's the list?", list)
  return list
}
