import { Badge } from "@/components/ui/badge"
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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-6 md:flex-row md:justify-evenly">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <h2 className="text-xl font-semibold">Watchlist</h2>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">6 movies</span>
              <DotIcon size={24} />
              <span className="text-sm text-muted-foreground">2 shows</span>
            </div>
          </div>

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
        </div>

        <div className="flex items-center justify-evenly gap-2 md:flex-row">
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

          <div role="group" className="flex items-center gap-1">
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

      <ul className="mx-auto w-full max-w-xl flex-1">
        <li className="flex justify-between gap-4 rounded-sm border border-border bg-accent p-4">
          <div className="flex items-center gap-6">
            <div className="h-18 w-12">
              <img
                src="https://picsum.photos/200/300"
                alt="Empty"
                className="h-full w-full rounded-sm bg-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Dune: Part Two</h2>
              <div className="flex">
                <span className="text-sm text-muted-foreground">2024</span>
                <DotIcon size={20} />
                <span className="text-sm text-primary">8.7</span>
              </div>
              <ul className="flex gap-1">
                <li>
                  <Badge variant="outline">sci-fi</Badge>
                </li>
                <li>
                  <Badge variant="outline">Adventure</Badge>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            <div className="flex flex-col gap-2">
              <Badge className="">Watching</Badge>
              <span className="text-sm text-muted-foreground">2 days ago</span>
            </div>
            <Button variant="destructive">Remove</Button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WatchlistPage
