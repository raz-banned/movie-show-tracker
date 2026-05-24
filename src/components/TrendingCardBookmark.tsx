import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { statusColors } from "@/utils/watchListStatusColors"
import type { TrendingProps } from "@/types/TrendingProps"
import { useWatchListContext } from "@/hooks/useStorageContext"

interface TrendingCardBookmarkProps extends TrendingProps {
  genres: { id: number; name: string }[] | undefined
}

export function TrendingCardBookmark({
  id,
  mediaType,
  posterPath,
  title,
  voteAverage,
  releaseDate,
  genres,
}: TrendingCardBookmarkProps) {
  const { watchList, setWatchList } = useWatchListContext()

  const bookmarkStatus = watchList.find((item) => item.id === id)?.status || ""
  const [isOpen, setIsOpen] = useState(false)

  const handleTriggerClick = () => {
    if (bookmarkStatus) {
      setWatchList((prev) => prev.filter((bookmark) => bookmark.id !== id))
    } else {
      setIsOpen(true)
    }
  }

  const handleOptionClick = (type: "Watching" | "Completed" | "Planning") => {
    setIsOpen(false)
    setWatchList((prev) => [
      ...prev,
      {
        id,
        mediaType,
        posterPath,
        title,
        voteAverage,
        releaseDate,
        status: type,
        addedAt: new Date().toISOString(),
        genres: genres ?? [],
      },
    ])
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          variant="outline"
          className={
            statusColors[bookmarkType] +
            " absolute top-2 left-2 rounded-sm bg-accent p-1"
          }
          onClick={handleTriggerClick}
        >
          <BookmarkSimpleIcon
            size={24}
            weight={bookmarkType ? "fill" : "regular"}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="flex w-auto flex-row gap-1 p-2">
        <Button variant="outline" onClick={() => handleOptionClick("Watching")}>
          Watching
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOptionClick("Completed")}
        >
          Completed
        </Button>
        <Button variant="outline" onClick={() => handleOptionClick("Planning")}>
          Planning
        </Button>
      </PopoverContent>
    </Popover>
  )
}
