import type { NormalizedMedia } from "@/types"

export interface WatchListStorageItem extends NormalizedMedia {
  status: "Watching" | "Completed" | "Planning"
  addedAt: string
}
