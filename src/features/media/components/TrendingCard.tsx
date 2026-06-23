import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { useShowGenres } from "@/hooks/Genres"
import { useMovieGenres } from "@/hooks/Genres"
import { Bookmark } from "../../watchlist/components/Bookmark"
import type { NormalizedMedia } from "@/types"

interface TrendingCardProps {
  item: NormalizedMedia
}

export function TrendingCard({ item }: TrendingCardProps) {
  const { movieGenresData } = useMovieGenres()
  const { showGenresData } = useShowGenres()

  const genresData =
    item.mediaType === "movie" ? movieGenresData : showGenresData
  const genres =
    genresData &&
    genresData.genres.filter((genre) => item.genreIds.includes(genre.id))

  return (
    <Card className="relative transform gap-2 overflow-hidden rounded-md p-0 transition-transform hover:-translate-y-1">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="flex flex-col p-4">
        <Badge className="absolute top-2 right-2 h-5 w-8 bg-accent p-1 text-xs">
          {item.voteAverage.toFixed(1)}
        </Badge>
        <Bookmark item={item} genres={genres || []} />
        <CardTitle className="truncate text-sm">
          {item.title.length > 30
            ? `${item.title.slice(0, 30)}...`
            : item.title}
        </CardTitle>
        <CardDescription className="text-xs">
          {item.releaseDate
            ? new Date(item.releaseDate).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
