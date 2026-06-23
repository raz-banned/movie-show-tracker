import type {
  MovieGenreResponse,
  MovieVideosResponse,
  TrendingMoviesResponse,
} from "@/types"
import { api, options } from "../../../lib/api"
import { useSearchParams } from "react-router"
import {  selectNormalizedMedia } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"



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

const fetchMovieGenres = async (): Promise<MovieGenreResponse> => {
  const res = await api(`/genre/movie/list`, options)
  if (!res.ok) {
    throw new Error("Failed to fetch movie genres")
  }
  const data = await res.json()
  return data
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
  const { data, isPending, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", "trending", timeWindow],
    queryFn: () => fetchTrendingMovies(timeWindow),
    enabled,
    select: selectNormalizedMedia,
  })

  return {
    moviesData: data,
    isMoviesPending: isPending,
    isMoviesLoading: isLoading,
    isMoviesError: isError,
    moviesError: error,
    refetchMovies: refetch,
  }
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

export const useFeaturedMovie = () => {
  const {
    moviesData,
    isMoviesPending,
    isMoviesError,
    moviesError,
    refetchMovies,
  } = useTrendingMovies("week", true)
  const {
    movieGenresData,
    isGenresPending,
    isGenresError,
    genresError,
    refetchGenres,
  } = useMovieGenres()
  const {
    data: videosData,
    isPending: isVideosPending,
    isError: isVideosError,
    error: videosError,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["movies", "videos", moviesData?.results[0].id],
    queryFn: ({ queryKey }) => {
      const movieId = queryKey[2]
      if (!movieId) throw new Error("Movie ID is required")
      return fetchMovieVideos(movieId as number)
    },
    enabled: !!moviesData?.results[0].id,
  })

  const movie = moviesData && moviesData.results[0]
  const movieGenres =
    movieGenresData &&
    movieGenresData.genres.filter((g) => movie?.genreIds.includes(g.id))
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
    movieGenres,
    movieTrailer,
    isPending: isMoviesPending || isGenresPending || isVideosPending,
    isError: isMoviesError || isGenresError || isVideosError,
    error: moviesError ?? genresError ?? videosError,
    refetch: () =>
      Promise.all([refetchMovies(), refetchGenres(), refetchVideos()]),
  }
}

export const useMovieCards = () => {
  const [searchParams] = useSearchParams()

  const {
    moviesData,
    isMoviesPending,
    isMoviesLoading,
    isMoviesError,
    moviesError,
    refetchMovies,
  } = useTrendingMovies(
    "week",
    // tab is null on fresh homepage load (no URL param yet)
    searchParams.get("tab") === "movies" || !searchParams.get("tab")
  )

  const movies = moviesData && moviesData.results.slice(1, 6)

  return {
    movies,
    isMoviesPending,
    isMoviesLoading,
    isMoviesError,
    moviesError,
    refetchMovies,
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
