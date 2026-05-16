import { StorageContext } from "@/context/StorageContext"
import { useContext } from "react"

export const useStorageContext = () => {
  const context = useContext(StorageContext)
  if (!context) {
    throw new Error("useStorageContext must be used within a StorageProvider")
  }
  return context
}
