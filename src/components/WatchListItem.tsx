import { DotIcon, TrashIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { WatchListStorageItem } from "@/types/WatchListStorageItem"
import { timeAgo } from "@/utils/timeAgo"
import type { Dispatch, SetStateAction } from "react"
import { statusBgColors, statusColors } from "@/utils/watchListStatusColors"

export function WatchListItem({
  item,
  layout,
  onStorageChange,
}: {
  item: WatchListStorageItem
  layout: string
  onStorageChange: Dispatch<SetStateAction<WatchListStorageItem[]>>
}) {
  const timePassed = timeAgo(new Date(item.addedAt))

  const handleDeleteClick = () => {
    onStorageChange((prev) => prev.filter((i) => i.id !== item.id))
  }

  return layout === "list" ? (
    <li
      key={item.id}
      className="flex flex-col gap-3 rounded-sm border border-border bg-accent p-3 md:h-28 md:flex-row md:items-center md:gap-4 md:p-2"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="aspect-2/3 w-18 shrink-0 md:w-16">
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.posterPath}`}
            alt={item.title}
            className="h-full w-full rounded-sm bg-gray-400"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
          <h2 className="line-clamp-1 text-lg font-semibold">{item.title}</h2>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              {item.releaseDate.split("-")[0]}
            </span>
            <DotIcon size={20} />
            <span className="text-sm text-primary">
              {item.voteAverage.toFixed(1)}
            </span>
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
        <img
          src={`https://image.tmdb.org/t/p/w500/${item.posterPath}`}
          alt={item.title}
          className="h-full w-full rounded-sm bg-gray-400"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-1">
        <h2 className="line-clamp-1 text-center text-lg font-semibold">
          {item.title}
        </h2>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            {item.releaseDate.split("-")[0]}
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
