import {
  fetchMovieGenres,
  type MovieGenreResponse,
} from "@/api/fetchMovieGenres"
import { fetchMovieVideos } from "@/api/fetchMovieVideos"
import { fetchTrendingMovies } from "@/api/fetchTrendingMovies"
import type { MovieVideosResponse } from "@/types/MovieVideosResponse"
import type { TrendingMoviesResponse } from "@/types/TrendingMoviesResponse"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useQuery } from "@tanstack/react-query"

export const useMainMovie = () => {
  const {
    data: moviesData,
    error: moviesError,
    isPending: isMoviesPending,
    refetch: refetchMovies,
  } = useQuery<TrendingMoviesResponse>({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchTrendingMovies("week"),
  })

  const {
    data: genresData,
    error: genresError,
    isPending: isGenresPending,
    refetch: refetchGenres,
  } = useQuery<MovieGenreResponse>({
    queryKey: ["movies", "genres"],
    queryFn: fetchMovieGenres,
  })

  const {
    data: videosData,
    error: videosError,
    isPending: isVideosPending,
    refetch: refetchVideos,
  } = useQuery<MovieVideosResponse>({
    queryKey: ["movies", "videos", moviesData?.results[0].id],
    queryFn: () => fetchMovieVideos(moviesData!.results[0].id),
    enabled: !!moviesData?.results[0].id,
  })

  const movie = moviesData && normalizeMedia(moviesData.results[0])
  const movieGenres =
    genresData &&
    genresData.genres.filter((g) => movie?.genreIds.includes(g.id))
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
    error: moviesError ?? genresError ?? videosError,
    refetch: () =>
      Promise.all([refetchMovies(), refetchGenres(), refetchVideos()]),
  }
}
