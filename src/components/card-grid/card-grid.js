import React from 'react'
import { rhythm } from '../../utils/typography'

const CardGrid = ({ children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: rhythm(1.25),
        gridAutoRows: 'max-content',
        gridAutoFlow: 'row dense',
      }}
    >
      {children}
    </div>
  )
}

export { CardGrid }
