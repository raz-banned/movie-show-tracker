import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react"
import type { WatchListStorageItem } from "../watchlist"

export const WatchListContext = createContext<{
  watchList: WatchListStorageItem[]
  setWatchList: Dispatch<SetStateAction<WatchListStorageItem[]>>
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
