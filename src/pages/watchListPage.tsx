import { WatchListHeader } from "@/components/WatchListHeader"
import { WatchListItem } from "@/components/WatchListItem"

function WatchListPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <WatchListHeader />

      <WatchListItem />
    </div>
  )
}

export default WatchListPage
