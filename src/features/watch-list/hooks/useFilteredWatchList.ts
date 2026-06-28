import { useWatchListContext } from "@/features/watch-list/context/WatchListContext"
import { useWatchListParams } from "@/features/watch-list/hooks/useWatchListParams"
import { useMemo } from "react"

export const useFilteredWatchList = () => {
  const { watchList, removeMedia } = useWatchListContext()
  const { tab } = useWatchListParams()

  const filteredStorage = useMemo(
    () =>
      tab === "all"
        ? watchList
        : watchList.filter((item) =>
            tab === "tv" ? item.mediaType === "tv" : item.mediaType === "movie"
          ),
    [watchList, tab]
  )
  const sortedStorage = useMemo(
    () => ({
      recentlyAdded: [...filteredStorage].sort((a, b) => {
        const dateA = new Date(a.addedAt).getTime()
        const dateB = new Date(b.addedAt).getTime()
        return dateB - dateA
      }),
      asc: [...filteredStorage].sort((a, b) => a.title.localeCompare(b.title)),
      desc: [...filteredStorage].sort((a, b) => b.title.localeCompare(a.title)),
      newest: [...filteredStorage].sort((a, b) => {
        if (!a.releaseDate) return 1
        if (!b.releaseDate) return -1
        const dateA = new Date(a.releaseDate).getTime()
        const dateB = new Date(b.releaseDate).getTime()
        return dateB - dateA
      }),
      oldest: [...filteredStorage].sort((a, b) => {
        if (!a.releaseDate) return 1
        if (!b.releaseDate) return -1
        const dateA = new Date(a.releaseDate).getTime()
        const dateB = new Date(b.releaseDate).getTime()
        return dateA - dateB
      }),
      highest: [...filteredStorage].sort(
        (a, b) => b.voteAverage - a.voteAverage
      ),
      lowest: [...filteredStorage].sort(
        (a, b) => a.voteAverage - b.voteAverage
      ),
    }),
    [filteredStorage]
  )

  const movieCount = watchList.filter(
    (item) => item.mediaType === "movie"
  ).length
  const showCount = watchList.filter((item) => item.mediaType === "tv").length

  return {
    items: sortedStorage,
    movieCount,
    showCount,
    onRemove: removeMedia,
  }
}
