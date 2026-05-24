import { fetchMovieVideos } from "@/api/fetchMovieVideos"
import type { MovieVideosResponse } from "@/types/MovieVideosResponse"
import { normalizeMedia } from "@/utils/normalizeMedia"
import { useQuery } from "@tanstack/react-query"
import { useMovieGenres } from "./useMovieGenres"
import { useTrendingMovies } from "./useTrendingMovies"

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
  } = useQuery<MovieVideosResponse>({
    queryKey: ["movies", "videos", moviesData?.results[0].id],
    queryFn: () => fetchMovieVideos(moviesData!.results[0].id),
    enabled: !!moviesData?.results[0].id,
  })

  const movie = moviesData && normalizeMedia(moviesData.results[0])
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
