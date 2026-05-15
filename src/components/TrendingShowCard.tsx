import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { TrendingCardBookmark } from "./TrendingCardBookmark"
import { Badge } from "./ui/badge"
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
        <Badge className="absolute top-2 right-2 h-5 w-8 bg-accent p-1 text-xs">
          {rating.toFixed(1)}
        </Badge>
        <TrendingCardBookmark />
        <CardTitle className="truncate text-sm">
          {name.length > 30 ? `${name.slice(0, 30)}...` : name}
        </CardTitle>
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
