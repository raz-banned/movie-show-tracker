import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"

export function TrendingCardBookmark() {
  const [bookmarkType, setBookmarkType] = useState<
    "Watching" | "Completed" | "Planning" | ""
  >("")
  const [isOpen, setIsOpen] = useState(false)

  const colorClass = {
    Watching: "text-green-500",
    Completed: "text-blue-500",
    Planning: "text-yellow-500",
    "": "",
  }

  const handleTriggerClick = () => {
    if (bookmarkType) {
      setBookmarkType("")
    } else {
      setIsOpen(true)
    }
  }

  const handleOptionClick = (type: "Watching" | "Completed" | "Planning") => {
    setBookmarkType(type)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          variant="outline"
          className={
            colorClass[bookmarkType] +
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
