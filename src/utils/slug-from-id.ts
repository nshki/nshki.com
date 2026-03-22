export function slugFromId(id: string): string {
  return id.split("-").slice(3).join("-")
}
