import React from 'react'
import Layout from '../components/layout'
import { PostPreview } from '../components/post-preview/post-preview'
import { graphql } from 'gatsby'

const Listing = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout
      pageTitle={pageContext.category.name}
      headerImage={data.headerImage.childImageSharp.fluid}
    >
      {pageContext.category.description ? (
        <p>{pageContext.category.description}</p>
      ) : (
        ''
      )}

      {posts.map(({ node }) => (
        <PostPreview
          key={node.fields.slug}
          post={node}
          image={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
    </Layout>
  )
}

export default Listing

export const pageQuery = graphql`
  query($categoryName: String!, $order: SortOrderEnum, $image: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $categoryName } } }
      sort: { fields: [frontmatter___date], order: [$order] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          fields {
            slug
          }
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            image {
              childImageSharp {
                fluid(maxWidth: 740) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    headerImage: file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
