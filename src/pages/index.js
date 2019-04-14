import React from 'react'
import { graphql } from 'gatsby'
import { PostPreview } from '../components/post-preview/post-preview'
import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteDescription = data.site.siteMetadata.description
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} pageTitle={siteDescription}>
        <SEO
          title="Outdoor Adventure – ultralight backpacking, fly fishing, bikepacking"
          description={siteDescription}
          keywords={[`hiking`, `backpacking`, `ultralight`, `adventure`]}
        />

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
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: "Page" } } }
    ) {
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
                fluid(maxWidth: 740) {
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
