import type { ReactNode } from "react"
import { StorageContext } from "./StorageContext"
import type { WatchListStorageItem } from "@/types/WatchListStorageItem"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [storage, setStorage] = useLocalStorage<WatchListStorageItem[]>(
    "watchList",
    []
  )

  return (
    <StorageContext value={{ storage, setStorage }}>{children}</StorageContext>
  )
}
