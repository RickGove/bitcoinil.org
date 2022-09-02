import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { flashElement, scrollToElement } from '../util/util'
import {
  phoneDevices,
  TOCBreakPointMobile,
  TOCBreakPointMobileHeight,
  TOCBreakPointOne
} from '../utils/breakpoints'
import {
  ElementToTrack,
  HTMLElementWithID,
  StickyTOCProps,
  tableOfContentItem,
  tableOfContentSubheading
} from '../utils/interfaces'
import ContentSubHeadings from './ContentSubheadings'
import { FormattedMessage } from './FormattedMessageWithHover'
import ItemDisplay from './ItemDisplay'
import SubHeadings from './Subheadings'

const StickyTOC: React.FC<StickyTOCProps> = ({
  categories,
  itemsOrganized
}) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  const [isAtEndMobile, setIsAtEndMobile] = React.useState(false)
  const [isAtStart, setisAtStart] = React.useState(false)
  // const [isError, setIsError] = React.useState(false)
  const [elInView, setElInView] = React.useState('')
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([])
  const [leftHandWidth, setLeftHandWidth] = React.useState<number>(0)

  const leftHandColumnRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()
  const startRef = React.createRef<HTMLDivElement>()

  const rightSideElements = React.useRef<(ElementToTrack | null)[]>([])
  const leftSideElements = React.useRef<(ElementToTrack | null)[]>([])

  const isStuck = isBelowZero && !isAtEnd && isAtStart && !isAtEndMobile

  // console.log('🦀', { categories })

  React.useEffect(() => {
    // console.log('😂 New IsStuck')
    // console.log({ isBelowZero, isAtEnd, isAtStart, isAtEndMobile })
    // console.log({ isStuck })
    // leftHandColumnRef?.current?.style.opacity = 0
    // leftHandColumnRef && leftHandColumnRef.current
    //   ? (leftHandColumnRef.current.style.opacity = 0)
    //   : null
    // leftHandColumnRef?.current?.style.opacity = 0
  }, [isStuck])

  React.useEffect(() => {
    // console.log({ isAtEnd, isAtEndMobile })
  }, [isAtEnd, isAtEndMobile])

  React.useEffect(() => {
    if (leftHandColumnRef?.current?.clientWidth)
      setLeftHandWidth(leftHandColumnRef?.current?.clientWidth - 50)
  }, [leftHandColumnRef.current])

  React.useEffect(() => {
    // console.log('What is the new El in view?', elInView)
    // take element in view, find the root menu title, and open it
    const elInViewData = getLeftSideElementFromStateUsingKey(elInView)

    if (elInViewData?.element.classList.contains('submenu-title')) {
      addKeyToOpenSubmenus(elInView, true)
    } else {
      if (elInViewData?.menuParent)
        addKeyToOpenSubmenus(elInViewData?.menuParent, true)
    }
  }, [elInView])

  React.useEffect(() => {
    // console.log('What are the openSubMenus? ', openSubmenus)
  }, [openSubmenus])

  React.useEffect(() => {
    // Check for duplicate keys in items
    const keys: string[] = []

    items.forEach(
      // : any is hard to fix here
      (item: any) => {
        // console.log(item)
        if (keys.includes(item.key)) {
          console.error(
            `TableOfContentsScrollTracked found duplicate key: ${item.key}`
          )
          // setIsError(true)
        } else {
          keys.push(item.key)
        }
        if (item.subHeadings) {
          item.subHeadings.forEach((subHeading: any) => {
            if (keys.includes(subHeading.key)) {
              console.error(
                `TableOfContentsScrollTracked found duplicate key: ${subHeading.key}`
              )
              // setIsError(true)
            } else {
              keys.push(subHeading.key)
            }
          })
        }
      }
    )
  }, [categories])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [rightSideElements, leftSideElements])

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckMenuInView)

    return () => window.removeEventListener('scroll', scrollCheckMenuInView)
  })

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckEnderInView)

    return () => window.removeEventListener('scroll', scrollCheckEnderInView)
  })

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckTopHotboxInView)

    return () =>
      window.removeEventListener('scroll', scrollCheckTopHotboxInView)
  })

  const getLeftSideElementFromStateUsingKey = (key: string) => {
    return leftSideElements.current.find((o) => o?.key === key)
  }

  const getRightSideElementFromStateUsingKey = (key: string) => {
    return rightSideElements.current.find((o) => o?.key === key)
  }

  const handleScroll = () => {
    const elsInView: (HTMLElementWithID | null)[] = []

    rightSideElements.current.forEach((el) => {
      if (el?.element?.getBoundingClientRect()) {
        if (el?.element?.getBoundingClientRect()?.y > -20) {
          elsInView.push(el.element)
        }
      }
    })

    if (elsInView[0] && elInView !== elsInView[0].id) {
      // console.log('🌞 Setting elInView to: ', elsInView[0].id)
      setElInView(elsInView[0].id)
    }
  }

  const isRefStored = (ref: ElementToTrack, left: boolean) => {
    const arrayToCheck = left ? leftSideElements : rightSideElements
    return !!arrayToCheck.current.find((o) => o?.key === ref.key)
  }

  const handleRef = (
    ref: HTMLElement | null,
    left: boolean,
    item: tableOfContentItem | tableOfContentSubheading,
    menuParent?: string | null
  ) => {
    if (!ref) return null
    if (left) {
      // console.groupCollapsed('-----------------------')
      // console.log('Adding ref for', ref)
      // console.log('On left? ', left)
      // console.log('item: ', item)
      // console.log('MenuParent', menuParent)
      // console.groupEnd()
    }

    const { hasSubheadings, key } = item

    const newElementToTrack: ElementToTrack = {
      element: ref,
      hasSubheadings: hasSubheadings,
      key,
      isSubMenuItem: false,
      menuParent
    }
    if (isRefStored(newElementToTrack, left)) return null

    if (left) {
      leftSideElements.current.push(newElementToTrack)
    } else {
      rightSideElements.current.push(newElementToTrack)
    }
  }

  const scrollToRightSideElement = (key: string) => {
    const el = getRightSideElementFromStateUsingKey(key)?.element

    if (!el) return null

    flashElement(el)
    scrollToElement(el)
    // window.scrollBy({ top: -50 })
  }

  const isSubmenuOpen = (key: string) => {
    for (let x = 0; x < openSubmenus.length; x++) {
      if (openSubmenus[x] === key) {
        return true
      }
    }
    return false
  }

  const addKeyToOpenSubmenus = (key: string, wipe?: boolean) => {
    // console.log('🏈🏈🏈 Add Ket To Open Subs 🏈🏈🏈')
    // console.log('key:', key)
    // console.log('wipe:', wipe)

    if (wipe) setOpenSubmenus([key])
    else setOpenSubmenus([...openSubmenus, key])
  }

  const removeKeyFromOpenSubmenus = (key: string) => {
    const newState: string[] = []

    openSubmenus.forEach((open, i) => {
      if (open !== key) {
        newState.push(open)
      }
    })

    setOpenSubmenus(newState)
  }

  const handleOpenSubmenu = (key: string) => {
    if (openSubmenus.includes(key)) removeKeyFromOpenSubmenus(key)
    else addKeyToOpenSubmenus(key)
  }

  const scrollCheckMenuInView = () => {
    if (!leftHandColumnRef.current?.getBoundingClientRect().y) return null
    setIsBelowZero(leftHandColumnRef.current?.getBoundingClientRect()?.y <= 0)
  }

  const scrollCheckEnderInView = () => {
    if (!endRef?.current) return

    setIsAtEndMobile(
      endRef.current.getBoundingClientRect().y < window.innerHeight - 500
    )

    setIsAtEnd(
      endRef.current?.getBoundingClientRect().y < window.innerHeight - 5000
    )
  }

  const scrollCheckTopHotboxInView = () => {
    if (!startRef?.current) return
    setisAtStart(startRef.current?.getBoundingClientRect().y < 0)
  }

  // console.log({ itemsOrganized })

  // console.log(categories)

  const items = !itemsOrganized
    ? React.useMemo(() => {
        return Object.entries(categories).map(([key, value]) => {
          // console.log(key)
          // console.log(key, value)
          const output = {
            categoryHeading: (
              <FormattedMessage
                key={`${Math.random()}-key`}
                id={`exchanges.config.${key}`}
                defaultMessage={`exchanges.config.${key}`}
              />
            ),
            key: key,
            hasSubheadings: true,
            isSubmenuParent: true,
            subHeadings: Object.entries(value).map(([subkey, subvalue]) => {
              const suboutput = {
                categoryHeading: (
                  <FormattedMessage
                    key={`fm-sh-${subkey}-${Math.random()}`}
                    id={`exchanges.config.${subkey}`}
                    defaultMessage={`exchanges.config.${subkey}`}
                  />
                ),
                key: subkey,
                isSubmenuParent: true,
                hasSubheadings: true,
                subHeadings: Object.entries(
                  subvalue as Record<string, Record<string, string>>
                ).map(([subsubkey, subsubvalue]) => {
                  // console.log('sub sub key:', subsubkey)
                  // console.log('sub sub value:', subsubvalue)

                  return {
                    categoryHeading: (
                      <React.Fragment
                        key={`${subsubkey}-cat-head-${Math.random() / 100}`}
                      >
                        {subsubvalue?.name ? subsubvalue.name : 'No name'}
                      </React.Fragment>
                      // <FormattedMessage
                      //   id={`exchanges.config.${subsubkey}`}
                      //   defaultMessage={`exchanges.config.${subsubkey}`}
                      // />
                    ),
                    key: subsubkey,
                    hasSubheadings: false,
                    isSubmenuParent: false,
                    body: () => {
                      // console.log('🥩', subsubvalue)
                      // if (
                      //   subsubvalue.name &&
                      //   subsubvalue.description &&
                      //   subsubvalue.url &&
                      //   subsubvalue.logo
                      // ) {
                      if (subsubvalue) {
                        return (
                          <ItemDisplay
                            name={subsubvalue.name}
                            description={subsubvalue.description}
                            url={subsubvalue.url}
                            logo={subsubvalue.logo}
                            key={`${
                              subsubvalue.name
                            }-body-comp-${Math.random()}`}
                          />
                        )
                      } else {
                        return (
                          <React.Fragment
                            key={`${Math.random()}-key-miss-subs`}
                          >
                            Missing SubSubValue
                          </React.Fragment>
                        )
                      }
                      // subsubvalue ?return (
                      //   <ItemDisplay
                      //     name={subsubvalue.name}
                      //     description={subsubvalue.description}
                      //     url={subsubvalue.url}
                      //     logo={subsubvalue.logo}
                      //   />
                      // ):return <>No sub sub</>
                      // } else {
                      //   console.log('🏈', subsubvalue)
                      //   return (
                      //     <React.Fragment
                      //       key={`No-SubSubValue-${Math.random() / 100}`}
                      //     >
                      //       🏈 Check Console For Missing Sub Sub Value
                      //     </React.Fragment>
                      //   )
                      // }
                      // console.log({ name, description, url, logo })
                    }
                    // bodyWithoutSubheadings: () => <></>,
                    // bodyWithoutSubheadings:  () => (
                    //     <>
                    //       Sup body of "{subsubkey}" - value: "{subsubvalue}"
                    //     </>
                    //   )
                    //         isSubmenuParent: false,
                    //         hasSubheadings: false
                  }
                })
              }
              return suboutput as tableOfContentItem
            })
          } as tableOfContentItem

          return output
        })
      }, [categories])
    : categories

  // if (!items) return <h1>No Items To Show</h1>
  if (!categories) return <h1>No Items To Show</h1>

  // if (isError) return <h1>You Have Duplicate Keys In Your Items, Fix That</h1>

  return (
    // Left Side First
    <StyledTableOfContentsScrollTracked id="TableOfContentsScrollTracked">
      <div className="top-hitbox" ref={startRef} />
      {/* <div className={`mobile-toc ${isStuck ? 'mobile-toc-stuck' : ''}`}>
        <StickyTOCBurger
          disabled={true}
          elInView={elInView}
          scrollToRightSideElement={scrollToRightSideElement}
          handleRef={handleRef}
          handleOpenSubmenu={handleOpenSubmenu}
          openSubmenus={openSubmenus}
          isSubmenuOpen={isSubmenuOpen}
          items={items}
          label={
            <span className="burger-menu-title">
              <FormattedMessage
                id={`faq.mobile.burger-menu-title`}
                defaultMessage={`See All`}
                description={`mobile.burger-menu-title`}
              />
            </span>
          }
        />
      </div> */}
      <div className="scroll-track-toc-main">
        <div
          className={`toc-scroll-tracked-left ${
            isStuck ? 'stuck' : 'unstuck'
          } ${isAtEndMobile ? 'hide-left-on-mobile-end' : ''}`}
          ref={leftHandColumnRef}
        >
          {items.map((item: any, i: number) => {
            if (!item.subHeadings) {
              // Here are the headings with no submenus
              // console.log('🦀🦀🦀 Made It Here')
              return (
                <div
                  key={`${item.key}-${i}-mapped-left-item-${Math.random()}`}
                  className={`toc-scroll-tracked-left-item-wrap`}
                >
                  🦀🦀🦀
                  <span
                    // DELETE ACTIVE TOC CLASS NAme????????
                    className={`toc-scroll-tracked-left-item-without-subheadings left-title ${
                      item.key === elInView ? 'not-active-toc-item' : ''
                    }`}
                    onClick={() => scrollToRightSideElement(item.key)}
                    ref={(ref) => handleRef(ref, true, item)}
                    key={i}
                  >
                    <div>{item.categoryHeading}</div>
                  </span>
                </div>
              )
            } else {
              // Here are the heading with submenus

              return (
                <React.Fragment
                  key={`${item.key}-${i}-subhead-${Math.random()}`}
                >
                  {/* 🧱🧱🧱 */}
                  <SubHeadings
                    i={i}
                    key={i}
                    item={item}
                    elInView={elInView}
                    handleRef={handleRef}
                    handleOpenSubmenu={handleOpenSubmenu}
                    openSubmenus={openSubmenus}
                    isSubmenuOpen={isSubmenuOpen}
                    scrollToRightSideElement={scrollToRightSideElement}
                  />
                </React.Fragment>
              )
            }
          })}
        </div>
        {/* LEFT SIDE ABOVE */}
        {/* RIGHT SIDE BELOW */}
        <div
          className={`toc-scroll-tracked-right ${
            isStuck ? 'right-when-is-stuck' : ''
          }`}
        >
          {items.map((item: any, i: any) => {
            if (!item.subHeadings) {
              // no subheadings
              // console.log('🇬🇧🇬🇧🇬🇧', item.bodyWithoutSubheadings)

              return (
                <React.Fragment key={`no-sub-${i}-${Math.random()}`}>
                  {/* 🇬🇧🇬🇧🇬🇧 */}
                  <span
                    id={item.key}
                    ref={(ref) => handleRef(ref, false, item)}
                    className={`toc-scroll-tracked-right-item-heading right-title accented-title`}
                  >
                    {item.categoryHeading}
                  </span>
                  {item.bodyWithoutSubheadings &&
                    item.bodyWithoutSubheadings[0] &&
                    item.bodyWithoutSubheadings[0].body && (
                      <span>{item.bodyWithoutSubheadings[0].body}</span>
                    )}
                </React.Fragment>
              )
            } else {
              // Has subheadings?
              return (
                <p>
                  <ContentSubHeadings
                    key={`cont-sub-${i}-${Math.random()}`}
                    i={i}
                    item={item}
                    handleRef={handleRef}
                  />
                </p>
              )
            }
          })}
        </div>
      </div>
      <div className="end-hitbox" ref={endRef} />
    </StyledTableOfContentsScrollTracked>
  )
}

export default StickyTOC

const leftTitleSize = 19
const leftSubtitleSize = 16
const rightTitleSize = 22
const rightBodySize = 20

const borderSize = 5

const StyledTableOfContentsScrollTracked = styled.div`
  margin-top: 100px;

  .mobile-toc {
    background-color: ${colors.accent};
    color: white;
    display: none;
    position: sticky;
    top: 0;
    left: 0;
    align-items: center;
    padding: 15px 0;

    .burger-menu-title {
      margin: 0;
      font-size: 17px;
      font-weight: bolder;
    }

    ${TOCBreakPointOne} {
      /* display: flex; */
      /* padding-left: 15px; */
    }

    ${TOCBreakPointMobileHeight} {
      display: flex;
    }
  }

  .scroll-track-toc-main {
    display: grid;
    grid-template-columns: [toc] 40% [body] 60%;

    ${phoneDevices} {
      padding: 20px;
      display: flex;
    }

    ${TOCBreakPointMobile} {
      flex-direction: column;

      .toc-scroll-tracked-right {
      }
    }
  }

  .toc-scroll-tracked {
    &-right {
      /* padding-top: 30px;
      padding-left: 50px;
      padding-right: 5vw;
      width: 50vw; */
      grid-area: body;
      display: flex;
      flex-direction: column;

      &-item-heading {
        font-size: ${leftTitleSize}px;
        &-has-subheadings {
          &-subheadings-wrap {
            &-title {
            }
          }
        }
      }
    }

    &-left {
      position: absolute;
      min-height: 100vh;
      /* width: 22%; */
      /* border-right: 1px solid var(--text-color-secondary); */
      overflow: scroll;
      padding: 0 30px;

      &::-webkit-scrollbar {
        width: 8px;
      }

      ${phoneDevices} {
        display: none;
      }

      &::-webkit-scrollbar-track {
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 200px;
      }

      &::-webkit-scrollbar-thumb:hover {
        opacity: 1;
      }

      span {
        /* width: 100%; */
      }

      &-has-subheadings {
        &-foldable {
          &-open {
          }

          &-closed {
          }
        }

        &-heading {
          font-size: ${leftTitleSize}px;
          cursor: pointer;

          &-arrow {
          }

          &-title {
          }
        }
      }

      &-item-without-subheadings {
        padding-right: 200px;
        font-size: ${leftTitleSize}px;
        cursor: pointer;
      }
    }
  }

  .stuck {
    /* position: fixed; */
    /* top: 0; */
    /* height: 100vh; */
  }

  .left-title {
    /* border-right: ${borderSize}px solid transparent; */
    img {
      transition: margin-right padding-top transform float 400ms;
      float: right;
      margin-right: 15px;
      padding-top: 10px;
    }
  }

  .left-subtitle {
    font-size: ${leftSubtitleSize}px;
    color: grey;
    cursor: pointer;
    padding-left: 20px;
  }

  .unstuck {
  }

  .end-hitbox,
  .top-hitbox {
    width: 80vw;
    height: 10px;
  }

  .end-hitbox {
    margin-top: 250px;

    ${TOCBreakPointMobile} {
      margin-top: 0;
    }
  }

  .right-when-is-stuck {
    /* position: sticky;
    top: 0; */

    ${TOCBreakPointOne} {
      /* background: blue; */
    }
  }

  .right-title {
    font-size: ${rightTitleSize}px;
    font-weight: bolder;

    ${phoneDevices} {
      /* padding-top: 80px; */
    }
  }

  .right-subtitle {
    font-size: ${rightBodySize}px;
    color: grey;
  }

  .active-toc-item {
    /* border-right: ${borderSize}px solid #00b3f0; */
  }

  .foldable-closed {
    /* height: 0; */
    /* overflow: hidden; */
  }

  .foldable-open {
    /* height: unset; */
  }

  .open-arrow {
    transition: margin-right padding-top transform float 400ms;
    transform: rotate(-90deg);
  }

  .accented-title {
    color: ${colors.accent};
    font-weight: bolder;
  }

  ${TOCBreakPointMobileHeight} {
    .toc-scroll-tracked {
      &-left {
        display: none;
      }
    }

    ${TOCBreakPointMobile} {
      .toc-scroll-tracked {
        &-left {
          display: none;
        }
        &-right {
          padding: 0;
          margin: 0;
          width: 95vw;
          padding: 50px;
          margin: auto;
        }
        .mobile-toc {
        }
      }
    }
  }

  .toc-scroll-tracked-left-item-wrap {
    /* background: dodgerblue; */
  }

  .subheading-title {
    /* background: blue; */
    color: ${colors.accent};
    padding-left: 15px;
    margin: 15px 0;
    font-size: 20px;
  }

  .main-title-toc {
    span {
      font-size: 28px;
    }
  }

  .double-indent-toc {
    padding-left: 25px;
  }

  table {
    /* background: dodgerblue; */
    font-size: 16px;
    thead {
      th {
        padding: 0 5px;
        border: 1px solid var(--text-color-secondary);
      }
    }

    tbody {
      td {
        border: 1px solid var(--text-color-secondary);
        padding: 5px;
      }
    }
  }

  .sub-sub-title-toc {
    margin-top: 10px;
    color: ${colors.accent};
    font-weight: 900;
    font-size: 21px;
  }
`
