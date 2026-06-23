import type { MovieGenreResponse, ShowGenreResponse } from "@/types"
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

export const fetchShowGenres = async (): Promise<ShowGenreResponse> => {
  const res = await api(`/genre/tv/list`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch show genres")
  }
  const data = await res.json()
  return data
}

export const useMovieGenres = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch: refetchGenres,
  } = useQuery({
    queryKey: ["movies", "genres"],
    queryFn: fetchMovieGenres,
    select: (data) => ({
      ...data,
      genres: data.genres.map((genre) => ({ ...genre, id: Number(genre.id) })),
    }),
  })

  return {
    movieGenresData: data,
    isGenresPending: isPending,
    isGenresError: isError,
    genresError: error,
    refetchGenres: refetchGenres,
  }
}

export const useShowGenres = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch: refetchGenres,
  } = useQuery({
    queryKey: ["shows", "genres"],
    queryFn: fetchShowGenres,
    select: (data) => ({
      ...data,
      genres: data.genres.map((genre) => ({ ...genre, id: Number(genre.id) })),
    }),
  })

  return {
    showGenresData: data,
    isGenresPending: isPending,
    isGenresError: isError,
    genresError: error,
    refetchGenres: refetchGenres,
  }
}
