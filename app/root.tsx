import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'remix'
import type { LinksFunction, MetaFunction } from 'remix'
import styles from '~/styles/base.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Nishiki Liu',
  viewport: 'width=device-width, initial-scale=1',
  description: 'Personal site of a full-stack developer.',
  'og:description': 'Personal site of a full-stack developer.',
  'og:image': 'https://nshki.com/assets/og.png',
  'twitter:card': 'summary',
  'twitter:site': '@nshki_',
  'twitter:image': 'https://nshki.com/assets/og.png',
  'twitter:title': 'Nishiki Liu',
  'twitter:description': 'Personal site of a full-stack developer.'
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
