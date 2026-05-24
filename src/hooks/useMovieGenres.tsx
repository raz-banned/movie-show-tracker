import {
  fetchMovieGenres,
  type MovieGenreResponse,
} from "@/api/fetchMovieGenres"
import { useQuery } from "@tanstack/react-query"

export const useMovieGenres = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch: refetchGenres,
  } = useQuery<MovieGenreResponse>({
    queryKey: ["movies", "genres"],
    queryFn: fetchMovieGenres,
  })

  return {
    movieGenresData: data,
    isGenresPending: isPending,
    isGenresError: isError,
    genresError: error,
    refetchGenres: refetchGenres,
  }
}
