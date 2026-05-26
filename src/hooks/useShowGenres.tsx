
import { fetchShowGenres } from "@/api/shows"
import { useQuery } from "@tanstack/react-query"

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
  })

  return {
    showGenresData: data,
    isGenresPending: isPending,
    isGenresError: isError,
    genresError: error,
    refetchGenres: refetchGenres,
  }
}
