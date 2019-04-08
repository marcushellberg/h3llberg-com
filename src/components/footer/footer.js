import React from 'react'
import { rhythm } from '../../utils/typography'
import twitter from './twitter.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: rhythm(3),
        textAlign: 'center',
      }}
    >
      <div className={styles.social}>
        <a href="https://twitter.com/h3llberg">
          <img src={twitter} alt="Twitter" />
        </a>
        <a href="https://facebook.com/h3llberg">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="https://instagram.com/h3llberg">
          <img src={instagram} alt="Instagram" />
        </a>
      </div>

      <p>© {new Date().getFullYear()} Marcus Hellberg</p>
    </footer>
  )
}

export { Footer }
