import { fetchTrendingShows } from "@/api/fetchTrendingShows"
import type { TrendingShowsResponse } from "@/types/TrendingShowsResponse"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

export const useTrendingShows = () => {
  const [searchParams] = useSearchParams()

  const { data, error, isLoading, refetch } = useQuery<TrendingShowsResponse>({
    queryKey: ["shows", "trending"],
    queryFn: () => fetchTrendingShows("week"),
    enabled: searchParams.get("tab") === "shows",
  })

  const shows = data && data.results.slice(1, 6).map(normalizeMedia)

  return {
    shows,
    isLoading,
    error,
    refetch,
  }
}
