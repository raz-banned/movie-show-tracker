
import { fetchTrendingShows } from "@/api/shows"
import { useQuery } from "@tanstack/react-query"

export const useTrendingShows = (
  timeWindow: "week" | "day",
  enabled: boolean
) => {
  const { data, isPending, isLoading, isError, error, refetch } =
    useQuery({
      queryKey: ["shows", "trending", timeWindow],
      queryFn: () => fetchTrendingShows(timeWindow),
      enabled,
    })

  return {
    showsData: data,
    isShowsPending: isPending,
    isShowsLoading: isLoading,
    isShowsError: isError,
    showsError: error,
    refetchShows: refetch,
  }
}
