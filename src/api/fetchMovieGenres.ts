import { options } from "./apiOptions"

export interface MovieGenreResponse {
  genres: {
    id: number
    name: string
  }[]
}

export const fetchMovieGenres = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    options
  )
  if (!res.ok) {
    throw new Error("Failed to fetch movie genres")
  }
  const data = await res.json()
  return data
}
