import { fetchShowGenres, type ShowGenreResponse } from "@/api/fetchShowGenres"
import { useQuery } from "@tanstack/react-query"

export const useShowGenres = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch: refetchGenres,
  } = useQuery<ShowGenreResponse>({
    queryKey: ["shows", "genres"],
    queryFn: fetchShowGenres,
  })

  return {
    showGenresData: data,
    isGenresPending: isPending,
    isGenresError: isError,
    genresError: error,
    refetchGenres: refetchGenres,
  }
}
