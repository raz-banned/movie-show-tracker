import { WatchListHeader } from "@/components/WatchListHeader"
import { WatchListItem } from "@/components/WatchListItem"
import { useStorageContext } from "@/hooks/useStorageContext"
import { useWatchListParams } from "@/hooks/useWatchListParams"
import { useMemo } from "react"

function WatchListPage() {
  const { storage, setStorage } = useStorageContext()
  const { tab, layout, handleParamChange } = useWatchListParams()

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

      <ul className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6">
        {filteredStorage.map((item) => (
          <WatchListItem
            key={item.id}
            item={item}
            onStorageChange={setStorage}
          />
        ))}
      </ul>
    </div>
  )
}

export default WatchListPage
