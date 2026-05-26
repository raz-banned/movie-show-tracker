import type {
  MovieGenreResponse,
  MovieVideosResponse,
  TrendingMoviesResponse,
} from "@/types/movie"
import { options } from "./apiOptions"

export const fetchTrendingMovies = async (
  timeWindow: "week" | "day"
): Promise<TrendingMoviesResponse> => {
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

export const fetchMovieByTitle = async (
  title: string
): Promise<TrendingMoviesResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1&include_adult=false`,
    options
  )
  if (!response.ok) {
    throw new Error("Failed to fetch movie data")
  }
  return response.json()
}

export const fetchMovieGenres = async (): Promise<MovieGenreResponse> => {
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

export const fetchMovieVideos = async (
  movieId: number
): Promise<MovieVideosResponse> => {
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
