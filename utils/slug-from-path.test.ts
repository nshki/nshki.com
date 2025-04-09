import { describe, it } from "vitest"

import { slugFromPath } from "./slug-from-path"

describe("slugFromPath()", () => {
  describe("happy paths", () => {
    it("extracts the slug properly from a date-formatted path", ({ expect }) => {
      const path = "/path/to/2024-09-08-this-is-the-slug.md"

      const result = slugFromPath(path)

      expect(result).toBe("this-is-the-slug")
    })
  })

  describe("sad paths", () => {
    it("returns empty string if a slug can't be extracted", ({ expect }) => {
      const path = "some random string"

      const result = slugFromPath(path)

      expect(result).toBe("")
    })
  })
})
