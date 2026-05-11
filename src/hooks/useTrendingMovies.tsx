import { fetchTrendingMovies } from "@/api/fetchTrendingMovies"
import type { TrendingMovieResponse } from "@/types/TrendingMovieResponse"
import { useQuery } from "@tanstack/react-query"

export function useTrendingMovies() {
  const {
    data: moviesData,
    error: moviesError,
    isPending: isMoviesPending,
    refetch: refetchMovies,
  } = useQuery<TrendingMovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchTrendingMovies("week"),
  })

  const movies = moviesData?.results.slice(1, 6)

  return {
    movies,
    isPending: isMoviesPending,
    error: moviesError,
    refetch: () => refetchMovies(),
  }
}
