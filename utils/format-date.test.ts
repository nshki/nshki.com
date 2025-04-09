import { describe, it } from "vitest"

import { formatDate } from "./format-date"

describe("formatDate()", () => {
  describe("happy paths", () => {
    it("formats a date in expected, US format", ({ expect }) => {
      const date = new Date("2024-09-08T12:00:00")

      const result = formatDate(date)

      expect(result).toBe("Sep 8, 2024")
    })
  })
})
