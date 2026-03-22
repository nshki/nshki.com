import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"

import { slugFromId } from "@/utils/slug-from-id"

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const site = context.site!.origin
  const absoluteUrl = (url: string): string => url.startsWith("/") ? `${site}${url}` : url
  const posts = [...await getCollection("posts")].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )

  return rss({
    title: "Nishiki Liu",
    description: "Blog",
    site: site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${slugFromId(post.id)}/`,
      content: sanitizeHtml(parser.render(post.body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        transformTags: {
          img: (tagName, attribs) => ({
            tagName,
            attribs: { ...attribs, src: absoluteUrl(attribs.src ?? "") }
          }),
          a: (tagName, attribs) => ({
            tagName,
            attribs: { ...attribs, href: absoluteUrl(attribs.href ?? "") }
          })
        }
      })
    }))
  })
}
