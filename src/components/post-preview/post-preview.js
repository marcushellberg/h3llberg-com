import React from 'react'
import styles from './post-preview.module.css'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const PostPreview = ({ post, image }) => {
  return (
    <Link to={post.fields.slug} className={styles.postPreview}>
      <h3>{post.frontmatter.title}</h3>
      <div
        style={{
          color: '#666',
          fontSize: '0.8em',
          marginBottom: '1rem',
          fontFamily: 'Montserrat,sans-serif',
        }}
      >
        {post.frontmatter.date} · {post.fields.readingTime.text}
      </div>
      <Img fluid={image} className={styles.image} />
      <p className={styles.excerpt}>
        {post.excerpt} <strong>continue reading&nbsp;›</strong>
      </p>
    </Link>
  )
}

export { PostPreview }
