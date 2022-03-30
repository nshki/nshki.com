import { json, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction } from 'remix'
import { getPost } from '~/lib/post'

import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Footer, footerLinks } from '~/components/footer'

import highlightStyles from 'highlight.js/styles/atom-one-dark.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: highlightStyles },
  ...containerLinks(),
  ...navLinks(),
  ...footerLinks()
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
    <Container>
      <Nav />

      <main className="wysiwyg">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>

        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>

      <Footer />
    </Container>
  )
}
