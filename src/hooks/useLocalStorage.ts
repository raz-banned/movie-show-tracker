import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      toast(`Error reading localStorage key "${key}"`)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      toast(`Error writing localStorage key "${key}"`)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
