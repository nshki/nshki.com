import { LinksFunction } from 'remix'

import { Container, containerLinks } from '~/components/container'
import { Nav, navLinks } from '~/components/nav'
import { Hero, heroLinks } from '~/components/hero'
import { About, aboutLinks } from '~/components/about'
import { Footer, footerLinks } from '~/components/footer'

export const links: LinksFunction = () => [
  ...containerLinks(),
  ...navLinks(),
  ...heroLinks(),
  ...aboutLinks(),
  ...footerLinks()
]

export default function Home() {
  return (
    <Container>
      <Nav />

      <main>
        <Hero />
        <About />
      </main>

      <Footer />
    </Container>
  )
}
