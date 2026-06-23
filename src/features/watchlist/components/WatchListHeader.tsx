import { DotIcon } from "@phosphor-icons/react"
import { Button } from "../../../components/ui/button"
import { WatchListControls } from "./WatchListControls"

interface WatchListHeaderProps {
  tab: string
  layout: string
  sort: string
  movieCount: number
  showCount: number
  onParamChange: (param: string, value: string) => void
}

export function WatchListHeader({
  tab,
  layout,
  sort,
  movieCount,
  showCount,
  onParamChange,
}: WatchListHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:justify-evenly">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <h2 className="text-xl font-semibold">Watchlist</h2>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              {movieCount} movies
            </span>
            <DotIcon size={20} />
            <span className="text-sm text-muted-foreground">
              {showCount} shows
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={tab === "all" ? "default" : "outline"}
            onClick={() => onParamChange("tab", "all")}
          >
            All
          </Button>
          <Button
            variant={tab === "movies" ? "default" : "outline"}
            onClick={() => onParamChange("tab", "movies")}
          >
            Movies
          </Button>
          <Button
            variant={tab === "shows" ? "default" : "outline"}
            onClick={() => onParamChange("tab", "shows")}
          >
            Shows
          </Button>
        </div>
      </div>

      <WatchListControls
        layout={layout}
        sort={sort}
        onParamChange={onParamChange}
      />
    </div>
  )
}
