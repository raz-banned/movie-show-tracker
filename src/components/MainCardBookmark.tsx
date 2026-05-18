import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useStorageContext } from "@/hooks/useStorageContext"
import type { Movie } from "@/types/TrendingMoviesResponse"
import { statusBgColors, statusColors } from "@/utils/watchlistStatusColors"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"

export function MainCardBookmark({ movie }: { movie: Movie }) {
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
        id: movie.id,
        status: type,
        added_at: new Date(),
        media_type: movie.media_type === "tv" ? "tv" : "movie",
        title: movie.title,
        release_date: movie.release_date,
        poster: movie.poster_path,
        rating: movie.vote_average,
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
