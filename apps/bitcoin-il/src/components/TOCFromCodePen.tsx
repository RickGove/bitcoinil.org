import * as React from 'react'
import styled from 'styled-components'
import { tableOfContentItem } from '../utils/interfaces'
import { FormattedMessage } from './FormattedMessageWithHover'

/**
 * This renders an item in the table of contents list.
 * scrollIntoView is used to ensure that when a user clicks on an item, it will smoothly scroll.
 */

export interface HeadingsProps<T> {
  headings: T[]
  activeId: string
}
const Headings = <T extends { id: string; title: string; items: any[] }>({
  headings,
  activeId
}: HeadingsProps<T>) => {
  console.log('🇬🇧', { headings })
  return (
    <ul>
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={heading.id === activeId ? 'active' : ''}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document?.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: 'smooth'
              })
            }}
          >
            {heading.title}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child: any) => (
                <li
                  key={child.id}
                  className={child.id === activeId ? 'active' : ''}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document?.querySelector(`#${child.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

/**
 * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
 */
export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = React.useState([])

  React.useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('main h2, main h3')
    )

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
  }, [])

  return { nestedHeadings }
}

interface HeadingElement {
  heading: string | null
  nodeName: string
  index: number
  id: string
  title: { title: string; id: string }
  innerText: {
    title: {
      title: string
      id: string
    }
    id: string
  }
}

export const getNestedHeadings = (headingElements: HeadingElement[]) => {
  const nestedHeadings: any[] = []
  headingElements.forEach((heading, index: number) => {
    const { innerText: title, id } = heading

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] })
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title
      })
    }
  })

  return nestedHeadings
}

export const useIntersectionObserver = (setActiveId: any) => {
  const headingElementsRef = React.useRef({})
  React.useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce(
        (map: [], headingElement: HeadingElement) => {
          map[headingElement.target.id] = headingElement
          return map
        },
        headingElementsRef.current
      )

      // Get all headings that are currently visible on the page
      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id)

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )

        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector('iframe'),
      rootMargin: '500px'
    })

    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

/**
 * Renders the table of contents.
 */

export const TableOfContents = () => {
  const [activeId, setActiveId] = React.useState()
  const { nestedHeadings } = useHeadingsData()
  useIntersectionObserver(setActiveId)

  return (
    <nav aria-label="Table of contents">
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  )
}

const DummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const TheTOCExport = ({ items }) => {
  console.log('🇫🇷', items)

  const generatedItems = React.useMemo(() => {
    return Object.entries(items).map(([key, value]) => {
      // console.log(key)
      console.log({ key, value })
      const output = {
        categoryHeading: (
          <FormattedMessage
            key={key}
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
                  <>{subsubvalue?.name ? subsubvalue.name : 'No name'}</>
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
                  const { name, description, url, logo } = subsubvalue
                  // console.log({ name, description, url, logo })
                  return (
                    <ItemDisplay
                      name={name}
                      description={description}
                      url={url}
                      logo={logo}
                    />
                  )
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

      console.log({ output })
      return output
    })
  }, [items])

  React.useEffect(() => {
    console.log({ items })
  }, [items])

  return (
    <TOCExportWrap>
      <div className="container">
        <TableOfContents />
        <main>
          {/* {JSON.stringify(items)} */}
          {generatedItems.map((item, i) => {
            console.log('🧱🧱🧱', item)
            return (
              <React.Fragment>
                <h2 id={item.key}>{item.categoryHeading}</h2>
                {/* <p>{DummyText}</p> */}
                {item.subHeadings?.map((subIt, i) => {
                  console.log('🥩🥩🥩', subIt)
                  return (
                    <React.Fragment>
                      <h3 id={subIt.key}>{subIt.categoryHeading}</h3>
                      {subIt.subHeadings?.map((subSubIt) => {
                        console.log('💻️💻️💻️', { subSubIt })
                        return (
                          <p id={subSubIt.key}>{subSubIt.categoryHeading}</p>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            )
          })}
          {/* <h2 id="whatevererjehrkajhre">Initial header</h2>
          <p>{DummyText}</p>
          <h2 id="second-header">Second header</h2>
          <p>{DummyText}</p>
          <h3 id="third-header">Third header</h3>
          <p>{DummyText}</p>
          <p>{DummyText}</p>
          <h2 id="fourth-header">Fourth header</h2>
          <p>{DummyText}</p>
          <p>{DummyText}</p>
          <p>{DummyText}</p>
          <p>{DummyText}</p>
          <h3 id="fifth-header">Fifth header</h3>
          <p>{DummyText}</p>
          <p>{DummyText}</p> */}
        </main>
      </div>
    </TOCExportWrap>
  )
}

export default TheTOCExport

const TOCExportWrap = styled.div`
  body {
    font-family: sans-serif;
    line-height: 1.6;
    background-color: #1f2233;
    color: #d8dee9;
  }
  .container {
    max-width: 1050px;
    margin: 0 auto;
    display: flex;
  }

  main {
    max-width: 800px;
    background-color: #161822;
    padding: 16px;
    border-radius: 8px;
    margin-left: 8px;
  }

  nav {
    width: 220px;
    min-width: 220px;
    padding: 16px;
    margin: 8px;
    align-self: flex-start;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 48px;
    max-height: calc(100vh - 70px);
    overflow: auto;
  }

  @media screen and (max-width: 500px) {
    nav {
      display: none;
    }
  }

  a {
    color: #a6acc9;
    text-decoration: none;
  }

  li.active > a {
    color: white;
  }

  li > a:hover {
    color: white;
  }

  /*  Gives a little bit of buffer when header is navigated to */
  h2,
  h3 {
    padding-top: 16px;
    margin-top: -16px;
  }
`
