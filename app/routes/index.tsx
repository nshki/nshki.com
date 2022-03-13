import { json, Link, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import { getPosts } from '~/lib/post'
import type { Post } from '~/lib/post'

export const loader: LoaderFunction = async () => {
  let posts: Post[] = await getPosts()

  return json(posts)
}

export default function Home() {
  const posts = useLoaderData<Post[]>()

  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
