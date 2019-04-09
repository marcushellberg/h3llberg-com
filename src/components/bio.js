/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <>
            <div
              style={{
                display: `flex`,
                padding: `${rhythm(0.5)} 0`,
                margin: `${rhythm(1)} 0`,
                borderTop: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                alignItems: 'center',
              }}
            >
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  minWidth: 50,
                  borderRadius: `100%`,
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
              <p style={{ margin: 0 }}>
                <strong>{author}</strong> lives in California and enjoys
                spending time out in the wilderness.
                {` `}
                You can reach him on &nbsp;
                <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
                ,&nbsp;
                <a href={`https://instagram.com/${social.instagram}`}>
                  Instagram
                </a>
                , and&nbsp;
                <a href={`https://facebook.com/${social.facebook}`}>Facebook</a>
                .
              </p>
            </div>
          </>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          facebook
          instagram
        }
      }
    }
  }
`

export default Bio
