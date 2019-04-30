const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const kebabCase = string => string.toLowerCase().replace(/\s/g, '-')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    {
      allCategoriesJson {
        edges {
          node {
            name
            description
            image {
              relativePath
            }
            order
            subCategories {
              name
              description
              image {
                relativePath
              }
              order
            }
          }
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              category
              tags
            }
          }
        }
      }
    }
  `)
  const createPages = posts => {
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }
  const categories = result.data.allCategoriesJson.edges.map(edge => edge.node)
  const allPosts = result.data.allMarkdownRemark.edges

  const postsByCategory = new Map()
  const flatCategories = categories.flatMap(c => [c, ...c.subCategories])
  allPosts.forEach(post => {
    const category =
      flatCategories.find(c => c.name === post.node.frontmatter.category) ||
      post.node.frontmatter.category
    if (!category) throw new Error(`Category ${post.category} not found`)

    const posts = postsByCategory.get(category) || []
    posts.push(post)
    postsByCategory.set(category, posts)
  })

  postsByCategory.forEach((posts, category) => {
    if (category.order && category.order === 'ASC') {
      posts.sort(
        (p1, p2) => p1.node.frontmatter.date > p2.node.frontmatter.date
      )
    }
    createPages(posts)
  })

  const categoryGalleryPage = path.resolve(
    `./src/templates/category-gallery-page.js`
  )
  const categoryListingPage = path.resolve(
    `./src/templates/category-listing-page.js`
  )

  const createCategories = (basePath, categories) => {
    categories.forEach(category => createCategory(basePath, category))
  }

  const createCategory = (basePath, category) => {
    const path = `${basePath}${kebabCase(category.name)}/`
    if (category.subCategories && category.subCategories.length > 0) {
      createGalleryPage(path, category)
      createCategories(path, category.subCategories)
    } else {
      createListingPage(path, category)
    }
  }

  const createGalleryPage = (path, category) => {
    createPage({
      path,
      component: categoryGalleryPage,
      context: {
        slug: path,
        category,
        categoryName: category.name,
        image: category.image.relativePath,
        childImages: category.subCategories.map(sub => {
          return {
            name: sub.name,
            image: sub.image.relativePath,
          }
        }),
        order: category.order,
      },
    })
  }

  const createListingPage = (path, category) => {
    createPage({
      path,
      component: categoryListingPage,
      context: {
        slug: path,
        category,
        categoryName: category.name,
        image: category.image.relativePath,
        order: category.order,
      },
    })
  }
  createCategories('/', categories)
  const tagListingPage = path.resolve(`./src/templates/tag-listing-page.js`)
  const tags = new Set(allPosts.flatMap(post => post.node.frontmatter.tags))

  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagListingPage,
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
