import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button" // поправил импорты на абсолютные алиасы
import { Link, useSearchParams } from "react-router"
import { TrendingCard } from "./TrendingCard"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTrendingMovies } from "@/features/media/api/movies"
import { useTrendingTv } from "@/features/media/api/shows"
import type { NormalizedMedia } from "@/types"
import type { SearchParams } from "../types"

export function TrendingCardsSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Card key={index} className="flex max-w-60 flex-col gap-2 rounded-md p-0">
      <Skeleton className="h-90 w-full rounded-md" />
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-1/3 rounded-md" />
      </div>
    </Card>
  ))
}

export function TrendingCards() {
  const [searchParams, setSearchParams] = useSearchParams()

  const params: SearchParams = {
    tab: (searchParams.get("tab") as SearchParams["tab"]) || "movies",
  }
  const activeTab = params.tab

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">In Trend</h2>
          <Button asChild variant="link">
            <Link to="/trending" className="flex items-center">
              <span>All</span>
              <ArrowRightIcon size={24} />
            </Link>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "movies" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ tab: "movies" })}
          >
            Movies
          </Button>
          <Button
            variant={activeTab === "tv" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ tab: "tv" })}
          >
            TV Shows
          </Button>
        </div>
      </div>

      {activeTab === "tv" ? <TvCards /> : <MovieCards />}
    </section>
  )
}

function MovieCards() {
  const { data, isPending, isError, error, refetch } = useTrendingMovies("week")

  const movies = data?.results.slice(1, 6)

  return (
    <MediaGrid
      media={movies}
      isPending={isPending}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}

function TvCards() {
  const { data, isPending, isError, error, refetch } = useTrendingTv("week")

  const shows = data?.results.slice(1, 6)

  return (
    <MediaGrid
      media={shows}
      isPending={isPending}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}

interface MediaGridProps {
  media: NormalizedMedia[] | undefined
  isPending: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

function MediaGrid({
  media,
  isPending,
  isError,
  error,
  refetch,
}: MediaGridProps) {
  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <TrendingCardsSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 py-10 text-center">
        <p className="font-medium text-destructive">Couldn't load data</p>
        {error?.message && (
          <p className="text-sm text-muted-foreground">{error.message}</p>
        )}
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  if (!media?.length) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <p>Нет результатов</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {media.map((item) => (
        <TrendingCard key={item.id} item={item} />
      ))}
    </div>
  )
}
