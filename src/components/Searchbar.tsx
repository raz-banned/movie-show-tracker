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
import { useQuery } from "@tanstack/react-query"
import { fetchMovieByTitle } from "@/api/movies"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useMovieGenres } from "@/hooks/useMovieGenres"
import { findGenres } from "@/utils/findGenres"
import { useDebounce } from "@/hooks/useDebounce"

export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 500)

  const navigate = useNavigate()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () => fetchMovieByTitle(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  })
  const { movieGenresData } = useMovieGenres()

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim().toLowerCase()
      if (!query) return
      navigate(`/movie/${query}`)
    }
  }

  const movies = data?.results.map(normalizeMedia).slice(0, 10) || []
  const genres =
    movieGenresData &&
    findGenres(movies, movieGenresData?.genres || []).slice(0, 2)

  const renderContent = () => {
    if (debouncedQuery.trim().length === 0) return null
    if (isPending) return <div>Loading...</div>
    if (isError)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>Couldn't load movies {error?.message}</p>
        </div>
      )
    if (movies.length === 0)
      return <ComboboxEmpty>No movies found.</ComboboxEmpty>

    return (
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item} value={item}>
            <SearchItem item={item} genres={genres ?? []} />
          </ComboboxItem>
        )}
      </ComboboxList>
    )
  }

  return (
    <Combobox items={movies}>
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon size={20} />
        <ComboboxInput
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>

      <ComboboxContent>{renderContent()}</ComboboxContent>
    </Combobox>
  )
}
