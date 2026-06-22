import type { ShowGenreResponse, TrendingShowsResponse } from "@/types/show"
import { api, options } from "../lib/api"

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

export const fetchShowGenres = async (): Promise<ShowGenreResponse> => {
  const res = await api(`/genre/tv/list`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch show genres")
  }
  const data = await res.json()
  return data
}
