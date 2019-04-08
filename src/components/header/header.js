import React from 'react'
import { Hero } from '../hero/hero'
import { Link } from 'gatsby'
import styles from './header.module.css'
import { StaticQuery, graphql } from 'gatsby'

const Header = ({ headerImage, pageTitle, subtitle }) => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
          headerImage: file(relativePath: { eq: "site-header.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => {
        headerImage = headerImage || data.headerImage.childImageSharp.fluid
        return (
          <header>
            <div className={styles.header}>
              <div className={styles.logo}>
                <h2>
                  <Link
                    style={{
                      boxShadow: `none`,
                      textDecoration: `none`,
                      color: `inherit`,
                    }}
                    to={`/`}
                  >
                    {data.site.siteMetadata.title}
                  </Link>
                </h2>
              </div>
              <nav>
                <ul className={styles.navigation}>
                  <li>
                    <Link to="/" activeClassName={styles.active}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/trips"
                      activeClassName={styles.active}
                      partiallyActive={true}
                    >
                      Trips
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      activeClassName={styles.active}
                      partiallyActive={true}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-me"
                      activeClassName={styles.active}
                      partiallyActive={true}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Hero
              headerImage={headerImage}
              title={pageTitle}
              subtitle={subtitle}
            />
          </header>
        )
      }}
    />
  )
}

export { Header }
