import { Divider } from 'antd'
import * as React from 'react'

import { ContentSubheadingsProps } from '../utils/interfaces'

const ContentSubHeadings: React.FC<ContentSubheadingsProps> = ({
  i,
  item,
  handleRef
}) => {
  // console.log(item.key, '🦀')
  if (!item.key) {
    console.error('❌  No Key Found On An Item - ', item)
  }

  return (
    <React.Fragment key={i}>
      {i !== 0 ? <Divider /> : null}
      <span className="margin-bottom-wrap main-title-toc">
        <span
          id={item.key}
          ref={(ref) => handleRef(ref, false, item)}
          className="accented-title toc-scroll-tracked-right-item-heading-has-subheadings right-title submenu-title span-display-block margin-bottom-span"
        >
          {item.categoryHeading}
          {/* 🦀 */}
        </span>
      </span>
      <span className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap">
        {item.subHeadings?.map((subItem, i) => {
          // console.log(subItem.subHeadings)
          return (
            <React.Fragment key={i}>
              <span
                id={subItem.key}
                ref={(ref) => handleRef(ref, false, subItem, item.key)}
                className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-title right-title span-display-block"
                style={{ display: 'block' }}
              >
                {/* 🚨🚨🚨 */}
              </span>
              <span className="toc-scroll-tracked-right-item-heading-has-subheadings-subheadings-wrap-body right-subtitle">
                {subItem.body ? (
                  <>
                    {/* 💂💂💂 */}
                    <subItem.body />
                    {subItem.hasSubheadings
                      ? subItem.subHeadings?.map((subHead, ii) => {
                          // console.log('🧮', subHead)
                          return (
                            <React.Fragment key={`subsub-${ii}`}>
                              <p className="subheading-title">
                                {/* 👻👻👻 */}
                                {subHead.categoryHeading}
                              </p>
                              <p className="double-indent-toc">
                                {/* 🌞🌞🌞 */}
                                {subHead.body ? subHead.body() : null}
                              </p>
                            </React.Fragment>
                          )
                        })
                      : null}
                  </>
                ) : subItem.hasSubheadings ? (
                  <ContentSubHeadings
                    key={`interal-content-subheadings-${i}`}
                    i={i}
                    item={subItem}
                    handleRef={handleRef}
                  />
                ) : (
                  <>No Body</>
                )}
              </span>
            </React.Fragment>
          )
        })}
      </span>
    </React.Fragment>
  )
}

export default ContentSubHeadings
