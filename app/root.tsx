import { useState } from 'react'
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
  'twitter:card': 'summary_large_image',
  'twitter:site': '@nshki_',
  'twitter:image': 'https://nshki.com/assets/og.png',
  'twitter:title': 'Nishiki Liu',
  'twitter:description': 'Personal site of a full-stack developer.'
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export default function App() {
  let [consoleMessageSent, setConsoleMessageSent] = useState(false);
  if (!consoleMessageSent) {
    console.info(`
      Fancy meeting you here.

      Check out https://github.com/nshki/nshki.com for the source code, since
      you're curious!

      Thanks for visiting my site. 🥂
    `)
    setConsoleMessageSent(true)
  }

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
