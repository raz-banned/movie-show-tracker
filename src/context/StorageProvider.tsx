import type { ReactNode } from "react"
import { StorageContext } from "./StorageContext"
import type { WatchlistItem } from "@/types/WatchlistItem"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [storage, setStorage] = useLocalStorage<WatchlistItem[]>(
    "watchlist",
    []
  )

  return (
    <StorageContext value={{ storage, setStorage }}>{children}</StorageContext>
  )
}
