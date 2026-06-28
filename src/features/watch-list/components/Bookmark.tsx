import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useWatchListContext } from "@/features/watch-list/context/WatchListContext"
import type { NormalizedMedia } from "@/types"
import { statusBgColors, statusColors } from "@/lib/utils"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"
interface BookmarkProps {
  item: NormalizedMedia
  variant?: "mainCard" | "trendingCard"
}

export function Bookmark({ item, variant = "mainCard" }: BookmarkProps) {
  const { watchList, addMedia, removeMedia, updateMediaStatus } =
    useWatchListContext()
  const [isOpen, setIsOpen] = useState(false)

  const bookmarkStatus =
    (item && watchList.find((watchItem) => watchItem.id === item.id)?.status) ||
    ""
  const isMainCard = variant === "mainCard"

  const handleTriggerClick = () => {
    if (bookmarkStatus) {
      removeMedia(item.id)
    } else {
      setIsOpen(true)
    }
  }

  const handleOptionClick = (type: "Watching" | "Completed" | "Planning") => {
    setIsOpen(false)

    if (item && bookmarkStatus) updateMediaStatus(item.id, type)
    else if (item && !bookmarkStatus) {
      addMedia({
        ...item,
        status: type,
        addedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${statusColors[bookmarkStatus]} ${isMainCard ? statusBgColors[bookmarkStatus] : "absolute top-2 left-2 rounded-sm bg-accent p-1"}`}
          onClick={handleTriggerClick}
        >
          <BookmarkSimpleIcon
            size={24}
            weight={bookmarkStatus ? "fill" : "regular"}
          />
          {isMainCard && <span>{bookmarkStatus || "Watchlist"}</span>}
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
