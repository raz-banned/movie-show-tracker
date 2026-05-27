import { DotIcon, StarIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import type { Genres } from "@/types/movie"
import type { NormalizedMedia } from "@/types/NormalizedMedia"

export function SearchItem({
  item,
  genres,
}: {
  item: NormalizedMedia
  genres: Genres[]
}) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {item.posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w92/${item.posterPath}`}
            className="h-14 w-10 rounded-sm object-cover"
          />
        ) : (
          <div className="h-14 w-10 rounded-sm bg-muted" />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-lg">{item.title}</span>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              {item.releaseDate
                ? new Date(item.releaseDate).getFullYear()
                : "N/A"}
            </span>
            <DotIcon size={18} />
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className="text-xs font-semibold"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Badge className="p-3 text-xs text-[oklch(from_var(--color-primary)_0.8_0.20_h)]">
          <StarIcon size={18} data-icon="inline-start" />
          {item.voteAverage.toFixed(1)}
        </Badge>
      </div>
    </div>
  )
}
