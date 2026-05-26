import type { ShowGenreResponse, TrendingShowsResponse } from "@/types/show"
import { options } from "./apiOptions"

export const fetchTrendingShows = async (
  timeWindow: "week" | "day"
): Promise<TrendingShowsResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/${timeWindow}?language=en-US`,
    options
  )
  if (!res.ok) {
    throw new Error("Failed to fetch trending shows")
  }
  const data = await res.json()
  return data
}

export const fetchShowGenres = async (): Promise<ShowGenreResponse> => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?language=en-US",
    options
  )
  if (!res.ok) {
    throw new Error("Failed to fetch show genres")
  }
  const data = await res.json()
  return data
}
