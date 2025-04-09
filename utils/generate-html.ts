import type { MDCNode } from "@nuxtjs/mdc"

import { APP_URL } from "./constants"

/**
 * Given a list of `MDCNode`s, generates basic HTML.
 */
export function generateHTML(nodes: Array<MDCNode>) {
  let html = ""

  nodes.forEach((node) => {
    if (node.type === "element") {
      // Render HTML attributes.
      let attributes = ""
      for (const propKey in node?.props) {
        // Only allowlist a handful of attributes.
        if (!["src", "href", "alt"].includes(propKey)) continue;

        let propValue = node.props[propKey]
        if (["src", "href"].includes(propKey) && propValue.startsWith("/")) {
          propValue = `${APP_URL}${propValue}`
        }
        attributes += ` ${propKey}="${propValue}"`
      }

      // Recurse for all child nodes.
      const children = generateHTML(node.children)

      // Produce tag.
      const tagName = node.tag
      if (tagName === "img") {
        html += `<${tagName}${attributes} />`
      } else {
        html += `<${tagName}${attributes}>${children}</${tagName}>`
      }
    } else if (node.type === "text") {
      html += node.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    }
  })

  return html
}
