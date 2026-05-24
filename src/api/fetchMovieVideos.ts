import { options } from "./apiOptions"

export const fetchMovieVideos = async (movieId: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options
  )
  if (!res.ok) {
    throw new Error("Failed to fetch movie videos")
  }
  const data = await res.json()
  return data
}
