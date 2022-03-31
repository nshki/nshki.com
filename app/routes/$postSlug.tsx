import { json, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import { getPost } from '~/lib/post'
import { title, description } from '~/lib/meta'

import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Pet } from '~/components/svgs/pet'
import { Footer, footerLinks } from '~/components/footer'

import highlightStyles from 'highlight.js/styles/atom-one-dark.css'

export const loader: LoaderFunction = ({ params }) => {
  if (!params.postSlug) {
    throw Error('`postSlug` missing')
  }

  return json(getPost(params.postSlug))
}

export const meta: MetaFunction = ({ data }) => ({
  ...title(data.title),
  ...description(data.description)
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: highlightStyles },
  ...containerLinks(),
  ...navLinks(),
  ...footerLinks()
]

export default function PostSlug() {
  let post = useLoaderData()

  return (
    <Container>
      <Nav />

      <main className="wysiwyg">
        <time dateTime={post.date}>
          {(new Date(post.date)).toLocaleDateString()}
        </time>

        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>

      <div className="footer-ornament">
        <Pet />
      </div>

      <Footer />
    </Container>
  )
}
