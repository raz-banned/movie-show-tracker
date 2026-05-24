import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useStorageContext } from "@/hooks/useStorageContext"
import type { NormalizedMedia } from "@/types/NormalizedMedia"
import { statusBgColors, statusColors } from "@/utils/watchListStatusColors"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"

export function MainCardBookmark({
  movie,
  genres,
}: {
  movie: NormalizedMedia
  genres: { id: number; name: string }[]
}) {
  const { storage, setStorage } = useStorageContext()

  const [bookmarkType, setBookmarkType] = useState<
    "Watching" | "Completed" | "Planning" | ""
  >(storage.find((item) => item.id === movie.id)?.status || "")
  const [isOpen, setIsOpen] = useState(false)

  const handleTriggerClick = () => {
    if (bookmarkType) {
      setBookmarkType("")
      setStorage((prev) => prev.filter((bookmark) => bookmark.id !== movie.id))
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
        ...movie,
        status: type,
        addedAt: new Date().toISOString(),
        genres,
      },
    ])
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${statusColors[bookmarkType]} ${statusBgColors[bookmarkType]}`}
          onClick={handleTriggerClick}
        >
          <BookmarkSimpleIcon
            size={24}
            weight={bookmarkType ? "fill" : "regular"}
          />
          <span>{bookmarkType || "Watchlist"}</span>
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
