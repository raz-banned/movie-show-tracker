import { fetchTrendingMovies } from "@/api/fetchTrendingMovies"
import type { TrendingMoviesResponse } from "@/types/TrendingMoviesResponse"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

export const useTrendingMovies = () => {
  const [searchParams] = useSearchParams()

  const { data, error, isLoading, refetch } = useQuery<TrendingMoviesResponse>({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchTrendingMovies("week"),
    enabled: searchParams.get("tab") === "movies" || !searchParams.get("tab"),
  })

  const movies = data && data.results.slice(1, 6).map(normalizeMedia)

  return {
    movies,
    isLoading,
    error,
    refetch,
  }
}
