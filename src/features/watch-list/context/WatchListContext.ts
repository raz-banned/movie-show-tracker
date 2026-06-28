import { createContext, useContext } from "react"
import type { WatchListStorageItem } from "../types"

export const WatchListContext = createContext<{
  watchList: WatchListStorageItem[]
  addMedia: (media: WatchListStorageItem) => void
  removeMedia: (id: number) => void
  updateMediaStatus: (
    id: number,
    status: WatchListStorageItem["status"]
  ) => void
} | null>(null)

export const useWatchListContext = () => {
  const context = useContext(WatchListContext)
  if (!context) {
    throw new Error(
      "useWatchListContext must be used within a WatchListProvider"
    )
  }
  return context
}
