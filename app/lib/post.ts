import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'

export type Post = {
  filename?: string
  slug: string
  title: string
  date: string
  description: string
  html?: string
}

export type PostAttributes = Omit<Post, 'filename' | 'slug' | 'html'>

let postsPath = path.join(__dirname, '..', 'posts')

/**
 * Slugifies a given string in the following format: `post-name`.
 */
function slugify(filename: string) {
  return filename.replace(/^\d+-\d+-\d+-/, '').replace(/\.md$/, '')
}

/**
 * Retrieves all posts.
 */
export async function getPosts(): Promise<Post[]> {
  let dir = await fs.readdir(postsPath)

  return Promise.all(
    dir.map(async (filename) => {
      let file = await fs.readFile(path.join(postsPath, filename))
      let {
        attributes: { title, date, description }
      } = parseFrontMatter<PostAttributes>(file.toString())

      return {
        slug: slugify(filename),
        title,
        date,
        description,
        filename
      }
    })
  )
}

/**
 * Retrieves a single post by slug.
 */
export async function getPost(slug: string): Promise<Post> {
  let posts = await getPosts()
  let post = posts.find((postData) => postData.slug === slug)
  if (!post || !post.filename) {
    throw new Response('Missing post!', { status: 404 })
  }

  let filepath = path.join(postsPath, post.filename)
  let file = await fs.readFile(filepath)
  let {
    attributes: { title, date, description },
    body
  } = parseFrontMatter<PostAttributes>(file.toString())
  let html = marked(body)

  return {
    slug,
    title,
    date,
    description,
    html
  }
}
