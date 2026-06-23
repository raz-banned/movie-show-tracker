import { useSearchParams } from "react-router"
import type { TrendingShowsResponse } from "../types"
import { api, options } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { selectNormalizedMedia } from "../utils"

export const fetchTrendingShows = async (
  timeWindow: "week" | "day"
): Promise<TrendingShowsResponse> => {
  const res = await api(`/trending/tv/${timeWindow}?language=en-US`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch trending shows")
  }
  const data = await res.json()
  return data
}

export const useTrendingShows = (
  timeWindow: "week" | "day",
  enabled: boolean
) => {
  const { data, isPending, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["shows", "trending", timeWindow],
    queryFn: () => fetchTrendingShows(timeWindow),
    enabled,
    select: selectNormalizedMedia,
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

export const useShowCards = () => {
  const [searchParams] = useSearchParams()

  const {
    showsData,
    isShowsPending,
    isShowsLoading,
    isShowsError,
    showsError,
    refetchShows,
  } = useTrendingShows("week", searchParams.get("tab") === "shows")

  const shows = showsData && showsData.results.slice(1, 6)

  return {
    shows,
    isShowsPending,
    isShowsLoading,
    isShowsError,
    showsError,
    refetchShows,
  }
}
