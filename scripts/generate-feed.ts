import { parseMarkdown } from "@nuxtjs/mdc/runtime"
import { Feed, type Item } from "feed"
import fg from "fast-glob"
import fs from "fs"

import { APP_URL } from "~/utils/constants"
import { generateHTML } from "~/utils/generate-html"
import { slugFromPath } from "~/utils/slug-from-path"

/**
 * Generates feed files based on posts.
 */
async function main() {
  const feed = new Feed({
    title: "Nishiki Liu",
    description: "Blog",
    id: APP_URL,
    link: APP_URL,
    image: `${APP_URL}/assets/og.png`,
    favicon: `${APP_URL}/favicon.ico`,
    author: { name: "Nishiki Liu", email: "hello@nshki.com" },
    copyright: "© Nishiki Liu",
    feedLinks: {
      rss: `${APP_URL}/feed.xml`
    }
  })

  // Generate a feed item per blog post.
  const postPaths: Array<string> = await fg("content/posts/*.md")
  const posts: Array<Item> = await Promise.all(
    postPaths.map(async (postPath: string) => {
      const rawContent = fs.readFileSync(postPath, "utf-8")
      const parsedContent = await parseMarkdown(rawContent)
      const frontmatter = parsedContent.data
      const html = generateHTML(parsedContent.body.children)
      const slug = slugFromPath(postPath)
      const item: Item = {
        title: frontmatter.title,
        author: [{ name: "Nishiki Liu", email: "hello@nshki.com" }],
        description: frontmatter.description,
        date: new Date(frontmatter.date),
        link: `${APP_URL}/${slug}`,
        content: html
      }
      return item
    })
  )

  // Add posts to feed and generate files.
  posts.forEach((post) => feed.addItem(post))
  fs.writeFileSync("public/feed.xml", feed.rss2())
}

main()
