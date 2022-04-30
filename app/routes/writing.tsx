import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'
import type { Post } from '~/lib/post'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPosts } from '~/lib/post'
import { title } from '~/lib/meta'

import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Grid, gridLinks } from '~/components/grid'
import { Card, cardLinks } from '~/components/card'
import { Pet } from '~/components/svgs/pet'
import { Footer, footerLinks } from '~/components/footer'

export const loader: LoaderFunction = async () => {
  let posts: Post[] = getPosts()
  return json(posts)
}

export const meta: MetaFunction = () => ({
  ...title('Writing')
})

export const links: LinksFunction = () => [
  ...containerLinks(),
  ...navLinks(),
  ...gridLinks(),
  ...cardLinks(),
  ...footerLinks()
]

export default function Writing () {
  const posts = useLoaderData<Post[]>()

  return (
    <Container>
      <Nav />

      <main>
        <h1>Writing</h1>

        <Grid>
          {posts.map((post, index) => (
            <Card
              key={index}
              to={`/${post.slug}`}
              title={post.title}
              date={post.date}
              description={post.description}
              large={index === 0}
            />
          ))}
        </Grid>
      </main>

      <div className="footer-ornament">
        <Pet />
      </div>

      <Footer />
    </Container>
  )
}
