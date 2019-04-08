import React from 'react'
import Layout from '../components/layout'
import { PostPreview } from '../components/post-preview/post-preview'
import { graphql } from 'gatsby'

const Listing = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout pageTitle={pageContext.tag}>
      {posts.map(({ node }) => (
        <PostPreview
          post={node}
          key={node.frontmatter.title}
          image={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
    </Layout>
  )
}

export default Listing

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            image {
              childImageSharp {
                fluid(maxWidth: 750) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
//      sort: { fields: [frontmatter___date], order: [$order] }
