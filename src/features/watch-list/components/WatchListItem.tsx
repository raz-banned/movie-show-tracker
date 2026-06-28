import { DotIcon, TrashIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { WatchListStorageItem } from "@/features/watch-list/watchList"
import { timeAgo, statusBgColors, statusColors } from "@/lib/utils"
import { useMovieGenres, useTvGenres } from "@/hooks/genres"

interface WatchListItemProps {
  item: WatchListStorageItem
  layout: string
  onRemove: (id: number) => void
}

export function WatchListItem({ item, layout, onRemove }: WatchListItemProps) {
  const { data: movieGenres } = useMovieGenres()
  const { data: tvGenres } = useTvGenres()

  const genres = item.mediaType === "tv" ? tvGenres : movieGenres
  const timePassed = timeAgo(new Date(item.addedAt))

  const handleDeleteClick = () => {
    onRemove(item.id)
  }

  return layout === "list" ? (
    <li
      key={item.id}
      className="flex flex-col gap-3 rounded-sm border border-border bg-accent p-3 md:h-28 md:flex-row md:items-center md:gap-4 md:p-2"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="aspect-2/3 w-18 shrink-0 md:w-16">
          {item.posterPath ? (
            <img
              src={item.posterPath(500)}
              alt={item.title}
              className="h-full w-full rounded-sm bg-gray-400"
            />
          ) : (
            <div className="h-full w-full rounded-sm bg-gray-400" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
          <h2 className="line-clamp-1 text-lg font-semibold">{item.title}</h2>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              {item.releaseDate ? item.releaseDate.split("-")[0] : "N/A"}
            </span>
            <DotIcon size={20} />
            <span className="text-sm text-primary">
              {item.voteAverage.toFixed(1)}
            </span>
          </div>
          <ul className="flex gap-1">
            {item.genreIds.map((id) => (
              <li key={id}>
                <Badge variant="outline">{genres?.[id] || "N/A"}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden flex-col items-end gap-1 md:flex">
        <Badge
          className={`${statusColors[item.status]} ${statusBgColors[item.status]} `}
        >
          {item.status}
        </Badge>
        <span className="text-sm text-muted-foreground">{timePassed}</span>
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="w-full md:w-18"
        onClick={handleDeleteClick}
      >
        <TrashIcon size={16} />
      </Button>
    </li>
  ) : (
    <li
      key={item.id}
      className="mx-auto flex w-full max-w-60 flex-col items-center gap-2 rounded-sm border border-border bg-accent p-3"
    >
      <div className="aspect-2/3 w-full">
        {item.posterPath ? (
          <img
            src={item.posterPath(500)}
            alt={item.title}
            className="h-full w-full rounded-sm bg-gray-400"
          />
        ) : (
          <div className="h-full w-full rounded-sm bg-gray-400" />
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-1">
        <h2 className="line-clamp-1 text-center text-lg font-semibold">
          {item.title}
        </h2>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            {item.releaseDate ? item.releaseDate.split("-")[0] : "N/A"}
          </span>
          <DotIcon size={20} />
          <span className="text-sm text-primary">
            {item.voteAverage.toFixed(1)}
          </span>
        </div>
        <Badge
          className={`${statusColors[item.status]} ${statusBgColors[item.status]} `}
        >
          {item.status}
        </Badge>
      </div>

      <Button
        variant="destructive"
        size="icon"
        className="w-full"
        onClick={handleDeleteClick}
      >
        <TrashIcon size={16} />
      </Button>
    </li>
  )
}
