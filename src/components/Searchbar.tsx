import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useState, type KeyboardEvent } from "react"
import { useNavigate } from "react-router"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox"
import { SearchItem } from "./SearchItem"

export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim().toLowerCase()
      if (!query) return
      navigate(`/movie/${query}`)
    }
  }

  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

  return (
    <Combobox items={frameworks}>
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon size={20} />
        <ComboboxInput
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>

      <ComboboxContent>
        <ComboboxEmpty>No movies found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              <SearchItem />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
