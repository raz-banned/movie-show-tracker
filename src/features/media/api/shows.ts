import type { TrendingTvResponse } from "../types"
import { api, options } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { selectNormalizedMedia } from "../utils"

export const fetchTrendingTv = async (
  timeWindow: "week" | "day"
): Promise<TrendingTvResponse> => {
  const res = await api(`/trending/tv/${timeWindow}?language=en-US`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch trending tv shows")
  }
  const data = await res.json()
  return data
}

export const useTrendingTv = (timeWindow: "week" | "day") => {
  return useQuery({
    queryKey: ["tv", "trending", timeWindow],
    queryFn: () => fetchTrendingTv(timeWindow),
    select: selectNormalizedMedia,
  })
}
