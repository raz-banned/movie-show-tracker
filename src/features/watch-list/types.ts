import type { NormalizedMedia } from "@/types"

export interface WatchListStorageItem extends NormalizedMedia {
  status: "Watching" | "Completed" | "Planning"
  addedAt: string
}

export interface SearchParams {
  tab: "all" | "movies" | "tv"
  layout: "grid" | "list"
  sort:
    | "recentlyAdded"
    | "asc"
    | "desc"
    | "newest"
    | "oldest"
    | "highest"
    | "lowest"
}
