import { DotIcon, StarIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"

export function SearchItem() {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <img
          src={`https://image.tmdb.org/t/p/w92/${"item.posterPath"}`}
          className="h-14 w-10 rounded-sm object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-lg">{"item.title"}</span>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">{"year"}</span>
            <DotIcon size={16} />
            <span className="text-sm text-primary">{"genres"}</span>
          </div>
        </div>
      </div>

      <div>
        <Badge className="p-3 text-xs text-[oklch(from_var(--color-primary)_0.8_0.20_h)]">
          <StarIcon size={18} data-icon="inline-start" />
          {"9.0"}
        </Badge>
      </div>
    </div>
  )
}
