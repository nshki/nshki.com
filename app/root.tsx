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
  viewport: 'width=device-width, initial-scale=1'
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
