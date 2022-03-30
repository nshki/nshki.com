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
function slugify(filename: string) {
  return filename.replace(/^\d+-\d+-\d+-/, '').replace(/\.md$/, '')
}

/**
 * Retrieves all posts.
 */
export function getPosts() {
  return Object.values(posts).map((post) => {
    return {
      slug: slugify(post.filename),
      title: post.attributes.title,
      date: post.attributes.date,
      description: post.attributes.description,
      data: post
    }
  })
}

/**
 * Retrieves a single post by slug.
 */
export function getPost(slug: string) {
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
