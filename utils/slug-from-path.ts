/**
 * Given a post path, extracts the slug.
 *
 * e.g. "/posts/2025-01-01-post-title.md" -> "post-title"
 */
export function slugFromPath(path: string): string | undefined {
  return path
    .split("-")
    .slice(3)
    .join("-")
    .split(".")
    .at(0)
}
