import { useLocalStorage } from "@/hooks/useLocalStorage"
import { WatchListContext } from "./WatchListContext"
import type { WatchListStorageItem } from "../watchlist"
import type { ReactNode } from "react"

export const WatchListProvider = ({ children }: { children: ReactNode }) => {
  const [watchList, setWatchList] = useLocalStorage<WatchListStorageItem[]>(
    "watchList",
    []
  )

  return (
    <WatchListContext value={{ watchList, setWatchList }}>
      {children}
    </WatchListContext>
  )
}
