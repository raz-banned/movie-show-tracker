import { BookmarkSimpleIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useState } from "react"
interface TrendingShowCardProps {
  poster: string
  name: string
  rating: number
  airDate: string
}

export function TrendingShowCard({
  poster,
  name,
  rating,
  airDate,
}: TrendingShowCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="relative transform gap-2 overflow-hidden rounded-md p-0 transition-transform hover:-translate-y-1">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="flex flex-col p-4">
        <span className="absolute top-2 right-2 rounded-sm bg-accent p-1 text-xs text-accent-foreground">
          {rating.toFixed(1)}
        </span>
        <Button
          size={"icon-sm"}
          className="absolute top-2 left-2 rounded-sm bg-accent p-1"
          onClick={() => setIsBookmarked((prev) => !prev)}
        >
          {isBookmarked ? (
            <BookmarkSimpleIcon size={20} weight="fill" />
          ) : (
            <PlusIcon size={20} />
          )}
        </Button>
        <CardTitle className="truncate text-sm">{name}</CardTitle>
        <CardDescription className="text-xs">
          {new Date(airDate).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
