import * as React from 'react'
import styled from 'styled-components'

import ico_angle from '../img/ico_angle_black.svg'
import { SubHeadingProps } from '../utils/interfaces'

const SubHeadings: React.FC<SubHeadingProps> = ({
  i,
  item,
  elInView,
  handleRef,
  handleOpenSubmenu,
  openSubmenus,
  isSubmenuOpen,
  scrollToRightSideElement
}): JSX.Element => {
  // console.log('🥩🥩🥩 This is a subheading', item.key === 'vindax' ? item : '')
  // console.log(elInView, item.key)
  // console.log(elInView === item.key)

  return (
    <StyledSubHeadings
      key={`subhead-${i}`}
      className="toc-scroll-tracked-left-has-subheadings submenu-title"
    >
      👽️👽️👽️
      <span
        className={`toc-scroll-tracked-left-has-subheadings-heading left-title flex-displayed-item ${
          item.key === elInView ? 'active-toc-item' : ''
        } ${!item.isSubmenuParent ? 'indented-submenu-title' : ''}`}
        // @ts-ignore
        // ref={handleRef}
        ref={(ref) => handleRef(ref, true, item)}
        onClick={() => {
          handleOpenSubmenu(item.key)
          // scrollToRightSideElement(item.key)
        }}
        // key={i}
      >
        🏈
        {item.categoryHeading}
        {/* {item.hasSubheadings ? (
          <img
            src={ico_angle}
            className={`toc-scroll-tracked-left-has-subheadings-heading-arrow ${
              openSubmenus.includes(item.key) ? 'open-arrow' : ''
            }`}
          />
        ) : null} */}
      </span>
      <div
        className={`toc-scroll-tracked-left-has-subheadings-foldable ${
          isSubmenuOpen(item.key) ? `foldable-open` : `foldable-closed`
        }`}
      >
        {item.subHeadings?.map((subItem, i) => {
          return (
            <div
              id={`span-subItem`}
              className={`toc-scroll-tracked-left-has-subheadings-heading-title left-subtitle `}
              ref={(ref) => handleRef(ref, true, subItem, item.key)}
              key={`item-sub${i}`}
              onClick={() => {
                scrollToRightSideElement(subItem.key)
              }}
            >
              {/* 👻👻👻 */}
              <div
                className={`country-header-item ${
                  subItem.key === elInView ? 'active-toc-item' : ''
                }`}
              >
                {subItem.categoryHeading}
              </div>
              {subItem.hasSubheadings &&
                subItem.subHeadings?.length &&
                subItem.subHeadings.map((subSubItem, ssi) => (
                  <SubHeadings
                    key={`ssi-${subSubItem.key}-${i}`}
                    i={ssi}
                    item={subSubItem}
                    elInView={elInView}
                    handleRef={handleRef}
                    handleOpenSubmenu={handleOpenSubmenu}
                    openSubmenus={openSubmenus}
                    isSubmenuOpen={isSubmenuOpen}
                    scrollToRightSideElement={scrollToRightSideElement}
                  />
                ))}
            </div>
          )
        })}
      </div>
    </StyledSubHeadings>
  )
}

export default SubHeadings

const StyledSubHeadings = styled.div`
  .flex-displayed-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .indented-submenu-title {
    margin-left: 50px;
  }

  .country-header-item {
    font-size: 19px;
    margin-bottom: 10px;
  }
`
