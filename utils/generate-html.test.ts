import { describe, it } from "vitest"
import type { MDCNode } from "@nuxtjs/mdc"

import { generateHTML } from "./generate-html"

describe("generateHTML()", () => {
  describe("happy paths", () => {
    it("produces expected HTML", ({ expect }) => {
      const nodes: Array<MDCNode> = [
        {
          type: "comment",
          value: "This is a comment"
        },
        {
          type: "element",
          tag: "div",
          props: { class: "content" },
          children: [
            {
              type: "text",
              value: "This is the main content"
            },
            {
              type: "element",
              tag: "img",
              props: { src: "https://absolute.nshki.com/path/to/img" },
              children: []
            },
            {
              type: "element",
              tag: "a",
              props: { href: "/path/to/link" },
              children: [
                {
                  type: "text",
                  value: "Link"
                }
              ]
            }
          ]
        }
      ]

      const result = generateHTML(nodes)

      let expectedHTML = ""
      expectedHTML += `<div class="content">`
      expectedHTML += `This is the main content`
      expectedHTML += `<img src="https://absolute.nshki.com/path/to/img" />`
      expectedHTML += `<a href="https://nshki.com/path/to/link">Link</a>`
      expectedHTML += `</div>`
      expect(result).toBe(expectedHTML)
    })
  })
})
