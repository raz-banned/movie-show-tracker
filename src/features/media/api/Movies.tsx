import type { MovieVideosResponse, TrendingMoviesResponse } from "../types"
import { api, options } from "../../../lib/api"
import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { selectNormalizedMedia } from "../utils"
import { useMovieGenres } from "@/hooks/Genres"

const fetchTrendingMovies = async (
  timeWindow: "week" | "day"
): Promise<TrendingMoviesResponse> => {
  const res = await api(`/trending/movie/${timeWindow}`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch trending movies")
  }
  const data = await res.json()
  return data
}

const fetchMovieByTitle = async (
  title: string
): Promise<TrendingMoviesResponse> => {
  const response = await api(
    `/search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1&include_adult=false`,
    options
  )
  if (!response.ok) {
    throw new Error("Failed to fetch movie data")
  }
  return response.json()
}

const fetchMovieVideos = async (
  movieId: number
): Promise<MovieVideosResponse> => {
  const res = await api(`/movie/${movieId}/videos`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch movie videos")
  }
  const data = await res.json()
  return data
}

export const useTrendingMovies = (
  timeWindow: "week" | "day",
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["movies", "trending", timeWindow],
    queryFn: () => fetchTrendingMovies(timeWindow),
    enabled,
    select: selectNormalizedMedia,
  })
}

export const useFeaturedMovie = () => {
  const {
    data: moviesData,
    isPending,
    isError,
    error,
    refetch: refetchMovies,
  } = useTrendingMovies("week", true)
  const { data: movieGenres, refetch: refetchGenres } = useMovieGenres()
  const { data: videosData, refetch: refetchVideos } = useQuery({
    queryKey: ["movies", "videos", moviesData?.results[0].id],
    queryFn: ({ queryKey }) => {
      const movieId = queryKey[2]
      if (!movieId) throw new Error("Movie ID is required")
      return fetchMovieVideos(movieId as number)
    },
    enabled: !!moviesData?.results[0].id,
  })

  const movie = moviesData?.results[0]
  const genres = movie?.genreIds
    .map((id) => movieGenres?.[id])
    .filter((g): g is string => !!g)
  const movieTrailer =
    videosData &&
    (videosData.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
    ) ||
      videosData.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ))

  return {
    movie,
    genres,
    movieTrailer,
    isPending,
    isError,
    error,
    refetch: () =>
      Promise.all([refetchMovies(), refetchGenres(), refetchVideos()]),
  }
}

export const useMovieCards = () => {
  const [searchParams] = useSearchParams()

  const { data, isPending, isError, error, refetch } = useTrendingMovies(
    "week",
    // tab is null on fresh homepage load (no URL param yet)
    searchParams.get("tab") === "movies" || !searchParams.get("tab")
  )

  const movies = data?.results.slice(1, 6)

  return {
    movies,
    isPending,
    isError,
    error,
    refetch,
  }
}

export const useSearchedMovies = (query: string) => {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => fetchMovieByTitle(query),
    enabled: query.trim().length > 0,
    select: selectNormalizedMedia,
  })
}
