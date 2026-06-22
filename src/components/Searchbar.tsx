import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useState } from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox"
import { SearchItem } from "./SearchItem"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useMovieGenres } from "@/hooks/useMovieGenres"
import { useDebounce } from "@/hooks/useDebounce"
import { useSearchedMovies } from "@/hooks/useSearchedMovies"

export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 500)

  const {
    data = { results: [] },
    isPending,
    isError,
    error,
  } = useSearchedMovies(debouncedQuery)
  const { movieGenresData = { genres: [] } } = useMovieGenres()

  const movies = data.results.map(normalizeMedia).slice(0, 10)

  const renderContent = () => {
    if (searchQuery.trim().length === 0) return null
    if (isPending) return <div className="p-2 text-center">Loading...</div>
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
        {movies.map((movie) => (
          <ComboboxItem key={movie.id} value={movie.id}>
            <SearchItem movie={movie} genres={movieGenresData.genres} />
          </ComboboxItem>
        ))}
      </ComboboxList>
    )
  }

  return (
    <Combobox>
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon size={20} />
        <ComboboxInput
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ComboboxContent>{renderContent()}</ComboboxContent>
    </Combobox>
  )
}
