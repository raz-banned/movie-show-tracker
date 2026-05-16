import type { WatchlistItem } from "@/types/WatchlistItem"
import { createContext, type Dispatch, type SetStateAction } from "react"

export const StorageContext = createContext<{
  storage: WatchlistItem[]
  setStorage: Dispatch<SetStateAction<WatchlistItem[]>>
} | null>(null)
