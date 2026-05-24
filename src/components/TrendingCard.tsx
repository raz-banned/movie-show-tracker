import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { TrendingCardBookmark } from "./TrendingCardBookmark"
import { Badge } from "./ui/badge"

export interface TrendingCardProps {
  id: number
  mediaType: "movie" | "tv"
  posterPath: string
  title: string
  voteAverage: number
  releaseDate: string
  genreIds: number[]
}

export function TrendingCard({
  id,
  mediaType,
  posterPath,
  title,
  voteAverage,
  releaseDate,
  genreIds,
}: TrendingCardProps) {
  return (
    <Card className="relative transform gap-2 overflow-hidden rounded-md p-0 transition-transform hover:-translate-y-1">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="flex flex-col p-4">
        <Badge className="absolute top-2 right-2 h-5 w-8 bg-accent p-1 text-xs">
          {voteAverage.toFixed(1)}
        </Badge>
        <TrendingCardBookmark
          id={id}
          mediaType={mediaType}
          posterPath={posterPath}
          title={title}
          voteAverage={voteAverage}
          releaseDate={releaseDate}
          genreIds={genreIds}
        />
        <CardTitle className="truncate text-sm">
          {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        </CardTitle>
        <CardDescription className="text-xs">
          {new Date(releaseDate).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
