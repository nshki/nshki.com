import { json, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction } from 'remix'
import { getPost } from '~/lib/post'
import highlightStyles from 'highlight.js/styles/atom-one-dark.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: highlightStyles }
]

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.postSlug) {
    throw Error('`postSlug` missing')
  }

  return json(await getPost(params.postSlug))
}

export default function PostSlug() {
  let post = useLoaderData()

  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
