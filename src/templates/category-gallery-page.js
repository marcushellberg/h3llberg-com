import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { kebabCase } from '../utils/string-utils'
import { Card } from '../components/card/card'
import { CardGrid } from '../components/card-grid/card-grid'
import SEO from '../components/seo'
const GalleryPage = ({ pageContext, data, location }) => {
  return (
    <Layout
      pageTitle={pageContext.category.name}
      headerImage={data.headerImage.childImageSharp.fluid}
    >
      <SEO
        title={pageContext.category.name}
        description={pageContext.category.description}
        location={location}
        image={data.headerImage.childImageSharp.fixed}
      />
      <p>{pageContext.category.description}</p>
      <CardGrid>
        {data.allCategoriesJson.edges[0].node.subCategories.map(sub => {
          return (
            <Card
              key={sub.name}
              title={sub.name}
              description={sub.description}
              image={sub.image.childImageSharp.fluid}
              link={pageContext.slug + kebabCase(sub.name)}
            />
          )
        })}
      </CardGrid>
    </Layout>
  )
}

export default GalleryPage

export const pageQuery = graphql`
  query($image: String!, $categoryName: String!) {
    headerImage: file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 1200, height: 630) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allCategoriesJson(filter: { name: { eq: $categoryName } }) {
      edges {
        node {
          subCategories {
            name
            description
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
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
