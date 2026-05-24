import { normalizeMedia } from "@/utils/normalizeMedia"
import { useTrendingShows } from "./useTrendingShows"
import { useSearchParams } from "react-router"

export const useShowCards = () => {
  const [searchParams] = useSearchParams()

  const {
    showsData,
    isShowsPending,
    isShowsLoading,
    isShowsError,
    showsError,
    refetchShows,
  } = useTrendingShows("week", searchParams.get("tab") === "shows")

  const shows = showsData && showsData.results.slice(1, 6).map(normalizeMedia)

  return {
    shows,
    isShowsPending,
    isShowsLoading,
    isShowsError,
    showsError,
    refetchShows,
  }
}
