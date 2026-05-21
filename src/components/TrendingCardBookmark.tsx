import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"
import type { TrendingCardProps } from "./TrendingCard"
import { useStorageContext } from "@/hooks/useStorageContext"
import { statusColors } from "@/utils/watchListStatusColors"

export function TrendingCardBookmark({
  id,
  mediaType,
  posterPath,
  title,
  voteAverage,
  releaseDate,
}: TrendingCardProps) {
  const { storage, setStorage } = useStorageContext()

  const [bookmarkType, setBookmarkType] = useState<
    "Watching" | "Completed" | "Planning" | ""
  >(storage.find((item) => item.id === id)?.status || "")
  const [isOpen, setIsOpen] = useState(false)

  const handleTriggerClick = () => {
    if (bookmarkType) {
      setBookmarkType("")
      setStorage((prev) => prev.filter((bookmark) => bookmark.id !== id))
    } else {
      setIsOpen(true)
    }
  }

  const handleOptionClick = (type: "Watching" | "Completed" | "Planning") => {
    setBookmarkType(type)
    setIsOpen(false)
    setStorage((prev) => [
      ...prev,
      {
        id,
        mediaType,
        posterPath,
        title,
        voteAverage,
        releaseDate,
        status: type,
        addedAt: new Date(),
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
