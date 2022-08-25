import * as React from 'react'
import styled from 'styled-components'

import { terms as oldTerms, useVocabulary } from '../data/VocabularyBodyData'
import { tableOfContentItem, VocabularyProps } from '../utils/interfaces'
import StickyTOC from './StickyTOC'
import TableOfContentsScrollTrackedVocabulary from './TableOfContentsScrollTrackedVocabulary'

const Vocabulary: React.FC<VocabularyProps> = ({}) => {
  const words = useVocabulary()
  // console.log('words from useVoca:', words)

  const terms = React.useMemo(() => {
    const ts = words.map(({ word, definition }) => {
      // console.log({ word, definition })
      return {
        categoryHeading: <>{word}</>,
        bodyWithoutSubheadings: [
          {
            body: definition
          }
        ],
        key: word,
        hasSubheadings: false
      } as tableOfContentItem
    })

    // console.log('👽️ What is ts?', ts)

    return ts
  }, [words])

  const spacer = {
    categoryHeading: (
      <>
        <hr />
      </>
    )
  } as tableOfContentItem

  return (
    <StyledVocabulary id="Vocabulary">
      <StickyTOC
        categories={[...terms, spacer, ...oldTerms]}
        itemsOrganized={true}
      />
    </StyledVocabulary>
  )
}

export default Vocabulary

const StyledVocabulary = styled.div``
