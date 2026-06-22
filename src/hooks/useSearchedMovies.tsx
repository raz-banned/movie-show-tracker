import { fetchMovieByTitle } from "@/api/movies"
import { useQuery } from "@tanstack/react-query"

export const useSearchedMovies = (query: string) => {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => fetchMovieByTitle(query),
    enabled: query.trim().length > 0,
  })
}
