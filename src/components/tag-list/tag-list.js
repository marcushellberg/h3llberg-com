import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from '../../utils/string-utils'
import styles from './tag-list.module.css'

const TagList = ({ tags }) => {
  return tags && tags.length > 0 ? (
    <>
      <h4>Tags</h4>
      <div className={styles.tagList}>
        {tags.map(tag => (
          <Link to={kebabCase(`tags/${tag}`)} className={styles.tag} key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </>
  ) : (
    ''
  )
}

export { TagList }
