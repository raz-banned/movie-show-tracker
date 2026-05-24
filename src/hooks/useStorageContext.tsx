import { WatchListContext } from "@/context/WatchListContext"
import { useContext } from "react"

export const useWatchListContext = () => {
  const context = useContext(WatchListContext)
  if (!context) {
    throw new Error(
      "useWatchListContext must be used within a WatchListProvider"
    )
  }
  return context
}
