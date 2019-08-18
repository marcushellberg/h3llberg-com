import React from 'react'
import { graphql } from 'gatsby'
import { PostPreview } from '../components/post-preview/post-preview'
import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} pageTitle={siteDescription}>
        <SEO
          title="Marcus Hellberg – outdoor adventure, ultralight backpacking, fly fishing, bikepacking"
          description={siteDescription}
          location={this.props.location}
          keywords={[`hiking`, `backpacking`, `ultralight`, `adventure`]}
        />
        <h2
          style={{
            textTransform: `uppercase`,
            fontFamily: `Montserrat, sans-serif`,
            paddingBottom: `6px`,
            borderBottom: `1px solid #666`,
          }}
        >
          Latest posts
        </h2>
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
      limit: 5
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
