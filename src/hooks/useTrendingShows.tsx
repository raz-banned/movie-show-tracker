import { fetchTrendingShows } from "@/api/fetchTrendingShows"
import type { TrendingShowsResponse } from "@/types/TrendingShowsResponse"
import { useQuery } from "@tanstack/react-query"

export const useTrendingShows = (timeWindow: 'week' | 'day', enabled: boolean) => {
  const { data, isPending, isError, error, refetch } =
    useQuery<TrendingShowsResponse>({
      queryKey: ["shows", "trending", timeWindow],
      queryFn: () => fetchTrendingShows(timeWindow),
      enabled,
    })

  return {
    showsData: data,
    isShowsPending: isPending,
    isShowsError: isError,
    showsError: error,
    refetchShows: refetch,
  }
}
