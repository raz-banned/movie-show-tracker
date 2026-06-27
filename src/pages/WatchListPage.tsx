import { WatchListHeader } from "@/features/watchlist/components/WatchListHeader"
import { WatchListItem } from "@/features/watchlist/components/WatchListItem"
import { useWatchListParams } from "@/features/watchlist/hooks/useWatchListParams"
import { useFilteredWatchList } from "@/features/watchlist/hooks/useFilteredWatchList"

function WatchListPage() {
  const { tab, layout, sort, handleParamChange } = useWatchListParams()
  const { items, movieCount, showCount, onRemove } = useFilteredWatchList()

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
        {items[sort as keyof typeof items]?.map((item) => (
          <WatchListItem
            key={item.id}
            layout={layout}
            item={item}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  )
}

export default WatchListPage
