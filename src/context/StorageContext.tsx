import type { WatchListStorageItem } from "@/types/WatchListStorageItem"
import { createContext, type Dispatch, type SetStateAction } from "react"

export const StorageContext = createContext<{
  storage: WatchListStorageItem[]
  setStorage: Dispatch<SetStateAction<WatchListStorageItem[]>>
} | null>(null)
