import { json, LinksFunction } from 'remix'
import type { LoaderFunction } from 'remix'
import { getPosts } from '~/lib/post'
import type { Post } from '~/lib/post'
import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Hero, heroLinks } from '~/components/hero'
import { About, aboutLinks } from '~/components/about'
import { Footer, footerLinks } from '~/components/footer'

export const loader: LoaderFunction = async () => {
  let posts: Post[] = await getPosts()
  return json(posts)
}

export const links: LinksFunction = () => [
  ...containerLinks(),
  ...navLinks(),
  ...heroLinks(),
  ...aboutLinks(),
  ...footerLinks()
]

export default function Home() {
  // const posts = useLoaderData<Post[]>()

  return (
    <>
      <Container>
        <Nav />

        <main>
          <Hero />
          <About />
        </main>

        <Footer />
      </Container>
    </>
  )
}

/*
<ul>
  {posts.map((post) => (
    <li key={post.slug}>
      <Link to={post.slug}>{post.title}</Link>
    </li>
  ))}
</ul>
*/
