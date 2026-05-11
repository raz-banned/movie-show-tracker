import {
  BookmarkSimpleIcon,
  DotIcon,
  PlayIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchTrendingMovies } from "@/api/fetchTrendingMovies"
import { type TrendingMovieResponse } from "@/types/TrendingMovieResponse"
import {
  fetchMovieGenres,
  type MovieGenreResponse,
} from "@/api/fetchMovieGenres"
import { fetchMovieVideos } from "@/api/fetchMovieVideos"
import type { MovieVideosResponse } from "@/types/MovieVideosResponse"

export function MainMovieCard() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const {
    data: moviesData,
    error: moviesError,
    isPending: isMoviesPending,
  } = useQuery<TrendingMovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchTrendingMovies("week"),
  })
  const {
    data: genresData,
    error: genresError,
    isPending: isGenresPending,
  } = useQuery<MovieGenreResponse>({
    queryKey: ["movies", "genres"],
    queryFn: fetchMovieGenres,
  })
  const {
    data: videosData,
    error: videosError,
    isPending: isVideosPending,
  } = useQuery<MovieVideosResponse>({
    queryKey: ["movies", "trending", "videos"],
    queryFn: () => fetchMovieVideos(moviesData?.results[0].id ?? 0),
  })

  if (isMoviesPending) {
    return <div>Loading...</div>
  }
  if (isGenresPending) {
    return <div>Loading genres...</div>
  }
  if (isVideosPending) {
    return <div>Loading videos...</div>
  }
  if (moviesError) {
    return (
      <div>
        Error: {moviesError.name} {moviesError.message}
      </div>
    )
  }
  if (genresError) {
    return (
      <div>
        Error: {genresError.name} {genresError.message}
      </div>
    )
  }
  if (videosError) {
    return (
      <div>
        Error: {videosError.name} {videosError.message}
      </div>
    )
  }
  if (!moviesData.results.length) return <div>No results</div>

  const movie = moviesData.results[0]
  const movieGenres = genresData.genres.filter((genre) =>
    movie.genre_ids.includes(genre.id)
  )
  const movieTrailer = videosData.results.find(
    (video) =>
      video.type === "Trailer" && video.site === "YouTube" && video.official
  )

  return (
    <Card className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-6 transition-transform hover:scale-101 md:flex-row md:items-start">
      <div className="w-full md:w-2/5">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <CardHeader className="p-0">
          <Badge>
            <TrendUpIcon size={32} />
            <span className="text-xs">В тренде</span>
          </Badge>
          <CardTitle className="text-xl font-semibold">{movie.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-sm font-medium">
              {movie.release_date.slice(0, 4)}
            </span>
            <DotIcon size={24} />
            <span className="text-sm font-semibold text-primary">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {movieGenres.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="text-xs font-semibold"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <p className="max-w-prose">{movie.overview.slice(0, 200)}...</p>
        </CardContent>
        <CardFooter className="mt-2 flex items-center gap-2 p-0">
          <Dialog>
            <Button asChild>
              <DialogTrigger>
                <PlayIcon size={24} />
                <span className="text-sm font-semibold">Watch Trailer</span>
              </DialogTrigger>
            </Button>
            <DialogContent>
              <DialogTitle>
                {movie.title} - {movieTrailer?.name}
              </DialogTitle>
              <div className="aspect-video w-full rounded-lg bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${movieTrailer?.key}`}
                  title={`${movie.title} - ${movieTrailer?.name}`}
                  allowFullScreen
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant={"secondary"}
            onClick={() => setIsBookmarked((prev) => !prev)}
          >
            {isBookmarked ? (
              <BookmarkSimpleIcon size={24} weight="fill" />
            ) : (
              <BookmarkSimpleIcon size={24} />
            )}
            <span className="text-sm font-medium">Watchlist</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
