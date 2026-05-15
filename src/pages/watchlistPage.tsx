import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowsDownUpIcon,
  DotIcon,
  ListBulletsIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { useSearchParams } from "react-router"

function WatchlistPage() {
  const [searchParam, setSearchParam] = useSearchParams({
    tab: "all",
    layout: "list",
  })
  const tab = searchParam.get("tab")
  const layout = searchParam.get("layout")

  const handleParamChange = (param: string, value: string) => {
    setSearchParam((prev) => {
      prev.set(param, value)
      return prev
    })
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Watchlist</h2>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">6 movies</span>
            <DotIcon size={24} />
            <span className="text-sm text-muted-foreground">2 shows</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-12">
          <div className="flex items-center gap-2">
            <Button
              variant={tab === "all" ? "default" : "outline"}
              onClick={() => handleParamChange("tab", "all")}
            >
              All
            </Button>
            <Button
              variant={tab === "movies" ? "default" : "outline"}
              onClick={() => handleParamChange("tab", "movies")}
            >
              Movies
            </Button>
            <Button
              variant={tab === "shows" ? "default" : "outline"}
              onClick={() => handleParamChange("tab", "shows")}
            >
              Shows
            </Button>
          </div>

          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  <span className="flex items-center gap-2">
                    <ArrowsDownUpIcon size={32} />
                    <span>Sort by Recently Added</span>
                  </span>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Title</SelectLabel>
                <SelectItem value="asc">A-Z</SelectItem>
                <SelectItem value="desc">Z-A</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Rating</SelectLabel>
                <SelectItem value="newest">Highest</SelectItem>
                <SelectItem value="oldest">Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant={layout === "list" ? "default" : "outline"}
              onClick={() => handleParamChange("layout", "list")}
            >
              <ListBulletsIcon size={16} />
            </Button>
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              onClick={() => handleParamChange("layout", "grid")}
            >
              <SquaresFourIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchlistPage
