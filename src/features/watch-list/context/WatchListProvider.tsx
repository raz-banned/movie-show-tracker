import { useLocalStorage } from "@/hooks/useLocalStorage"
import { WatchListContext } from "./WatchListContext"
import type { WatchListStorageItem } from "../types"
import type { ReactNode } from "react"

export const WatchListProvider = ({ children }: { children: ReactNode }) => {
  const [watchList, setWatchList] = useLocalStorage<WatchListStorageItem[]>(
    "watchList",
    []
  )

  const addMedia = (media: WatchListStorageItem) => {
    setWatchList((prev) => [...prev, media])
  }

  const removeMedia = (id: number) => {
    setWatchList((prev) => prev.filter((item) => item.id !== id))
  }

  const updateMediaStatus = (
    id: number,
    status: WatchListStorageItem["status"]
  ) => {
    setWatchList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    )
  }

  return (
    <WatchListContext
      value={{ watchList, addMedia, removeMedia, updateMediaStatus }}
    >
      {children}
    </WatchListContext>
  )
}
