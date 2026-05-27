import { WatchListHeader } from "@/components/WatchListHeader"
import { WatchListItem } from "@/components/WatchListItem"
import { useWatchListContext } from "@/hooks/useStorageContext"
import { useWatchListParams } from "@/hooks/useWatchListParams"
import { useMemo } from "react"

function WatchListPage() {
  const { watchList, setWatchList } = useWatchListContext()
  const { tab, layout, sort, handleParamChange } = useWatchListParams()

  const filteredStorage = useMemo(
    () =>
      tab === "all"
        ? watchList
        : watchList.filter((item) =>
            tab === "movies"
              ? item.mediaType === "movie"
              : item.mediaType === "tv"
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

  const onDelete = (id: number) => {
    setWatchList((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <WatchListHeader
        tab={tab}
        layout={layout}
        sort={sort}
        movieCount={movieCount}
        showCount={showCount}
        onParamChange={handleParamChange}
      />

      <ul
        className={
          layout === "list"
            ? "mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6"
            : "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
        }
      >
        {sortedStorage[sort as keyof typeof sortedStorage]?.map((item) => (
          <WatchListItem
            key={item.id}
            layout={layout}
            item={item}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default WatchListPage
