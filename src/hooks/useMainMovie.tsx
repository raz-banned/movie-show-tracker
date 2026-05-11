import {
  fetchMovieGenres,
  type MovieGenreResponse,
} from "@/api/fetchMovieGenres"
import { fetchMovieVideos } from "@/api/fetchMovieVideos"
import { fetchTrendingMovies } from "@/api/fetchTrendingMovies"
import type { MovieVideosResponse } from "@/types/MovieVideosResponse"
import type { TrendingMovieResponse } from "@/types/TrendingMovieResponse"
import { useQuery } from "@tanstack/react-query"

export function useMainMovie() {
  const {
    data: moviesData,
    error: moviesError,
    isPending: isMoviesPending,
    refetch: refetchMovies,
  } = useQuery<TrendingMovieResponse>({
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
    queryKey: ["movies", "trending", "videos"],
    queryFn: () => fetchMovieVideos(moviesData?.results[0].id ?? 0),
  })

  const movie = moviesData?.results?.[0]
  const movieGenres = genresData?.genres.filter((g) =>
    movie?.genre_ids.includes(g.id)
  )
  const movieTrailer =
    videosData?.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
    ) ||
    videosData?.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    )

  return {
    movie,
    movieGenres,
    movieTrailer,
    isPending: isMoviesPending || isGenresPending || isVideosPending,
    error: moviesError ?? genresError ?? videosError,
    refetch: () => {
      refetchMovies()
      refetchGenres()
      refetchVideos()
    },
  }
}
