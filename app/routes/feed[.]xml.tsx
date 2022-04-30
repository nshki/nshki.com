import { LoaderFunction } from '@remix-run/node'
import { getPosts, Post } from '~/lib/post'

export const loader: LoaderFunction = async () => {
  let posts: Post[] = getPosts()
  let baseUrl = 'https://nshki.com'

  let rss = `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Writing @ nshki.com</title>
        <description>Blog posts of Nishiki Liu.</description>
        <link>${baseUrl}</link>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />

        ${posts.map((post) => {
          let rtc822date = (new Date(post.date)).toUTCString()

          return `
            <item>
              <title><![CDATA[${post.title}]]></title>
              <description><![CDATA[${post.description}]]></description>
              <pubDate>${rtc822date}</pubDate>
              <link>${baseUrl}/${post.slug}</link>
              <guid>${baseUrl}/${post.slug}</guid>
            </item>
          `.trim()
        }).join('\n')}
      </channel>
    </rss>
  `.trim()

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rss))
    }
  })
}
