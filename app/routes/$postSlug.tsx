import { json, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import { getPost } from '~/lib/post'

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
