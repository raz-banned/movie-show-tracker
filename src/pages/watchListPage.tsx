import { WatchListHeader } from "@/components/WatchListHeader"
import { WatchListItem } from "@/components/WatchListItem"
import { useStorageContext } from "@/hooks/useStorageContext"
import { useWatchListParams } from "@/hooks/useWatchListParams"
import { useMemo } from "react"

function WatchListPage() {
  const { storage, setStorage } = useStorageContext()
  const { tab, layout, sort, handleParamChange } = useWatchListParams()

  const filteredStorage = useMemo(
    () =>
      tab === "all"
        ? storage
        : storage.filter((item) =>
            tab === "movies"
              ? item.mediaType === "movie"
              : item.mediaType === "tv"
          ),
    [storage, tab]
  )
  const sortedStorage = {
    recentlyAdded: [...filteredStorage].sort((a, b) => {
      const dateA = new Date(a.addedAt).getTime()
      const dateB = new Date(b.addedAt).getTime()
      return dateB - dateA
    }),
    asc: [...filteredStorage].sort((a, b) => a.title.localeCompare(b.title)),
    desc: [...filteredStorage].sort((a, b) => b.title.localeCompare(a.title)),
    newest: [...filteredStorage].sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime()
      const dateB = new Date(b.releaseDate).getTime()
      return dateB - dateA
    }),
    oldest: [...filteredStorage].sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime()
      const dateB = new Date(b.releaseDate).getTime()
      return dateA - dateB
    }),
    highest: [...filteredStorage].sort((a, b) => b.voteAverage - a.voteAverage),
    lowest: [...filteredStorage].sort((a, b) => a.voteAverage - b.voteAverage),
  }

  const movieCount = storage.filter((item) => item.mediaType === "movie").length
  const showCount = storage.filter((item) => item.mediaType === "tv").length

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <WatchListHeader
        tab={tab}
        layout={layout}
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
            onStorageChange={setStorage}
          />
        ))}
      </ul>
    </div>
  )
}

export default WatchListPage
