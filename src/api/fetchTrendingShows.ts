import { options } from "./apiOptions"

export const fetchTrendingShows = async (timeWindow: "week" | "day") => {
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
