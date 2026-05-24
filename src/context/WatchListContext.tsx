import type { WatchListStorageItem } from "@/types/WatchListStorageItem"
import { createContext, type Dispatch, type SetStateAction } from "react"

export const WatchListContext = createContext<{
  watchList: WatchListStorageItem[]
  setWatchList: Dispatch<SetStateAction<WatchListStorageItem[]>>
} | null>(null)
