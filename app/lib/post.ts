import { renderToString } from 'react-dom/server'
import * as posts from '~/posts'

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  html?: string
}

/**
 * Slugifies a given string in the following format: `post-name`.
 */
function slugify (filename: string) {
  return filename.replace(/^\d+-\d+-\d+-/, '').replace(/\.md$/, '')
}

/**
 * Retrieves all posts in reverse chronological order.
 */
export function getPosts () {
  let allPosts = Object.values(posts).map((post) => {
    return {
      slug: slugify(post.filename),
      title: post.attributes.title,
      date: post.attributes.date,
      description: post.attributes.description,
      data: post
    }
  })

  allPosts.sort((a, b) => {
    if (a.date > b.date) return -1
    else if (a.date < b.date) return 1
    else return 0
  })

  return allPosts
}

/**
 * Retrieves a single post by slug.
 */
export function getPost (slug: string) {
  let posts = getPosts()
  let post = posts.find((postData) => postData.slug === slug)
  if (!post) {
    throw new Response('Missing post!', { status: 404 })
  }

  return {
    ...post,
    // @ts-ignore
    html: renderToString(post.data.default())
  }
}
