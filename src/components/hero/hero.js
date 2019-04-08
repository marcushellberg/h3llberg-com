import React from 'react'
import Img from 'gatsby-image'
import styles from './hero.module.css'

const Hero = ({ headerImage, title, subtitle }) => {
  return (
    <div className={styles.hero}>
      {headerImage ? (
        <Img className={styles.headerImage} fluid={headerImage} />
      ) : (
        ''
      )}
      <div className={styles.titles}>
        {title ? <h1>{title}</h1> : ''}
        {subtitle ? <p>{subtitle}</p> : ''}
      </div>
    </div>
  )
}

export { Hero }
