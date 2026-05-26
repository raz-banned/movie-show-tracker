import { fetchTrendingMovies } from "@/api/movies"
import { useQuery } from "@tanstack/react-query"

export const useTrendingMovies = (
  timeWindow: "week" | "day",
  enabled: boolean
) => {
  const { data, isPending, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", "trending", timeWindow],
    queryFn: () => fetchTrendingMovies(timeWindow),
    enabled,
  })

  return {
    moviesData: data,
    isMoviesPending: isPending,
    isMoviesLoading: isLoading,
    isMoviesError: isError,
    moviesError: error,
    refetchMovies: refetch,
  }
}
