import { json, useLoaderData, LinksFunction } from 'remix'
import type { LoaderFunction } from 'remix'
import { getPosts } from '~/lib/post'
import type { Post } from '~/lib/post'

import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Grid, gridLinks } from '~/components/grid'
import { Card, cardLinks } from '~/components/card'
import { Footer, footerLinks } from '~/components/footer'

export const loader: LoaderFunction = async () => {
  let posts: Post[] = await getPosts()
  posts.sort((a, b) => {
    if (a.date > b.date) return -1
    else if (a.date < b.date) return 1
    else return 0
  })
  return json(posts)
}

export const links: LinksFunction = () => [
  ...containerLinks(),
  ...navLinks(),
  ...gridLinks(),
  ...cardLinks(),
  ...footerLinks()
]

export default function Writing() {
  const posts = useLoaderData<Post[]>()

  return (
    <>
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
                date={new Date(post.date).toLocaleDateString('en-us')}
                description={post.description}
                large={index === 0}
              />
            ))}
          </Grid>
        </main>

        <Footer />
      </Container>
    </>
  )
}
