import { normalizeMedia } from "@/utils/normalizeMedia"
import { useSearchParams } from "react-router"
import { useMovieGenres } from "./useMovieGenres"
import { useTrendingMovies } from "./useTrendingMovies"

export const useMovies = () => {
  const [searchParams] = useSearchParams()

  const {
    moviesData,
    isMoviesPending,
    isMoviesError,
    moviesError,
    refetchMovies,
  } = useTrendingMovies(
    "week",
    searchParams.get("tab") === "movies" || !searchParams.get("tab")
  )
  const { movieGenresData } = useMovieGenres()

  const movies =
    moviesData && moviesData.results.slice(1, 6).map(normalizeMedia)
  const movieGenres =
    movieGenresData &&
    movieGenresData.genres.filter((g) =>
      movies?.some((m) => m.genreIds.includes(g.id))
    )

  return {
    movies,
    movieGenres,
    isMoviesPending,
    isMoviesError,
    moviesError,
    refetchMovies,
  }
}
