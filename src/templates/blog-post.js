import React from 'react'
import { graphql, Link } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './blog-post.css'
import { rhythm } from '../utils/typography'
import { TagList } from '../components/tag-list/tag-list'
import { kebabCase } from '../utils/string-utils'

class BlogPostTemplate extends React.Component {
  constructor(...args) {
    super(...args)
    this.ref = React.createRef()
  }

  componentDidMount() {
    const loadCommento = () => {
      const commentoScript = document.createElement('script')
      commentoScript.src = 'https://cdn.commento.io/js/commento.js'
      commentoScript.setAttribute('async', true)
      this.ref.current.appendChild(commentoScript)
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadCommento()
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '0px 0px 300px 0px',
        }
      )
      observer.observe(document.querySelector('#comments'))
    } else {
      setTimeout(loadCommento, 1000)
    }
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const {
      frontmatter: { title, description, image, category, date, tags },
      fields: { readingTime },
    } = post

    //TODO: fix properly 🙈
    let backLink = ''
    if (category === 'Blog') backLink = '/blog'
    else if (category !== 'Page') backLink = `/trips/${kebabCase(category)}`
    // const { previous, next } = this.props.pageContext

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}
        headerImage={image.childImageSharp.fluid}
        pageTitle={title}
      >
        <SEO
          title={title}
          description={description || post.excerpt}
          image={image.childImageSharp.fixed}
        />

        {category === 'Page' ? (
          ''
        ) : (
          <div
            style={{
              color: '#666',
              fontSize: '0.8em',
              marginBottom: rhythm(1),
              fontFamily: 'Montserrat,sans-serif',
            }}
          >
            {date} · {readingTime.text}
          </div>
        )}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            margin: `80px 0`,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← Previous post: {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                Next post: {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>

        {backLink ? (
          <Link to={backLink} className="back-link">
            ‹ Back to {category}
          </Link>
        ) : (
          ''
        )}
        <Bio />
        <TagList tags={tags} />
        <div ref={this.ref} id="comments" />
        {category !== 'Page' ? (
          <>
            <h4>Comments</h4>
            <div id="commento" />
          </>
        ) : (
          ''
        )}
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
