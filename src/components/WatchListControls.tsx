import {
  ArrowsDownUpIcon,
  ListBulletsIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface ControlProps {
  layout: string
  sort: string
  onParamChange: (param: string, value: string) => void
}

export function WatchListControls({
  layout,
  sort,
  onParamChange,
}: ControlProps) {
  const handleSortChange = (value: string) => {
    onParamChange("sort", value)
  }

  return (
    <div className="flex items-center justify-evenly gap-2">
      <Select
        defaultValue="recentlyAdded"
        value={sort || "recentlyAdded"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              <span className="flex items-center gap-2">
                <ArrowsDownUpIcon size={20} />
                <span>Sort by Recently Added</span>
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent className="p-2">
          <SelectItem value="recentlyAdded">Recently Added</SelectItem>
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
            <SelectItem value="highest">Highest</SelectItem>
            <SelectItem value="lowest">Lowest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div role="group" className="flex items-center gap-1">
        <Button
          variant={layout === "list" ? "default" : "outline"}
          onClick={() => onParamChange("layout", "list")}
        >
          <ListBulletsIcon size={16} />
        </Button>
        <Button
          variant={layout === "grid" ? "default" : "outline"}
          onClick={() => onParamChange("layout", "grid")}
        >
          <SquaresFourIcon size={16} />
        </Button>
      </div>
    </div>
  )
}
