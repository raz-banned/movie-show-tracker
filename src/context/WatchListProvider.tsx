import type { ReactNode } from "react"
import { WatchListContext } from "./WatchListContext"
import type { WatchListStorageItem } from "@/types/WatchListStorageItem"
import { useLocalStorage } from "@/hooks/useLocalStorage"

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
