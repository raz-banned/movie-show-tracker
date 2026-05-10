import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "./ui/input"
import { useState, type KeyboardEvent } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useNavigate } from "react-router"

export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedValue = useDebounce(searchQuery, 500)
  const navigate = useNavigate()

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim().toLowerCase()
      if (!query) return
      navigate(`/movie/${query}`)
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl items-center gap-2">
      <MagnifyingGlassIcon size={24} />
      <Input
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeydown}
      />
    </div>
  )
}
