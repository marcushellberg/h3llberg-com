import React from 'react'
import Img from 'gatsby-image'
import styles from './card.module.css'
import { Link } from 'gatsby'

const Card = ({ title, link, image, subtitle }) => {
  return (
    <div className={styles.card}>
      <Link to={link} alt={title}>
        {image ? <Img fluid={image} className={styles.coverImage} /> : ''}
      </Link>
      <div className={styles.articleInfo}>
        <h3>
          <Link to={link} alt={title}>
            {title}
          </Link>
        </h3>

        <small>{subtitle}</small>
      </div>
    </div>
  )
}

export { Card }
