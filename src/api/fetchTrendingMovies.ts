import { options } from "./optionsGet"

export const fetchTrendingMovies = async (timeWindow: "week" | "day") => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`,
    options
  )
  if (!res.ok) {
    throw new Error("Failed to fetch trending movies")
  }
  const data = await res.json()
  return data
}
