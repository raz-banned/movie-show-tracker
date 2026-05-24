import { options } from "./apiOptions"

export interface ShowGenreResponse {
  genres: {
    id: number
    name: string
  }[]
}

export const fetchShowGenres = async () => {
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
