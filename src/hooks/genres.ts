import type { GenresMap, MovieGenreResponse, TvGenreResponse } from "@/types"
import { api, options } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const fetchMovieGenres = async (): Promise<MovieGenreResponse> => {
  const res = await api(`/genre/movie/list`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch movie genres")
  }
  const data = await res.json()
  return data
}

export const fetchTvGenres = async (): Promise<TvGenreResponse> => {
  const res = await api(`/genre/tv/list`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch tv genres")
  }
  const data = await res.json()
  return data
}

export const useMovieGenres = () => {
  return useQuery({
    queryKey: ["movies", "genres"],
    queryFn: fetchMovieGenres,
    select: (data): GenresMap => {
      return data.genres.reduce<Record<number, string>>((acc, genre) => {
        acc[Number(genre.id)] = genre.name
        return acc
      }, {})
    },
  })
}

export const useTvGenres = () => {
  return useQuery({
    queryKey: ["tv", "genres"],
    queryFn: fetchTvGenres,
    select: (data): GenresMap => {
      return data.genres.reduce<Record<number, string>>((acc, genre) => {
        acc[Number(genre.id)] = genre.name
        return acc
      }, {})
    },
  })
}
