import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { useState } from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import { title, description, image } from '~/lib/meta'
import styles from '~/styles/base.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  ...title('Nishiki Liu'),
  ...description('Personal site of a full-stack developer.'),
  ...image('https://nshki.com/assets/og.png'),
  'twitter:card': 'summary_large_image',
  'twitter:site': '@nshki_',
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export default function App () {
  let [consoleMessageSent, setConsoleMessageSent] = useState(false);
  if (!consoleMessageSent) {
    console.info(`
      Fancy meeting you here.

      Check out https://github.com/nshki/nshki.com for the source code, since you're curious!

      Thanks for visiting my site. 🥂
    `.split('\n').map((line) => line.trim()).splice(1).join('\n'))
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
