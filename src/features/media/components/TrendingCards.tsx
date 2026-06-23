import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "../../../components/ui/button"
import { Link, useSearchParams } from "react-router"
import { TrendingCard } from "./TrendingCard"
import { Card } from "../../../components/ui/card"
import { Skeleton } from "../../../components/ui/skeleton"
import { useMovieCards } from "@/features/media/api/Movies"
import { useShowCards } from "@/features/media/api/Shows"

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
  const activeTab = searchParams.get("tab") || "movies"

  const { movies, isMoviesLoading, isMoviesError, moviesError, refetchMovies } =
    useMovieCards()
  const { shows, isShowsLoading, isShowsError, showsError, refetchShows } =
    useShowCards()

  const isLoading = isMoviesLoading || isShowsLoading
  const isError = isMoviesError || isShowsError
  const items = activeTab === "shows" ? shows : movies

  const content = () => {
    if (isLoading) return <TrendingCardsSkeleton />
    if (isError)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>
            Couldn't load {activeTab === "shows" ? "shows" : "movies"}
            {isMoviesError ? moviesError?.message : showsError?.message}
          </p>
          <Button
            onClick={() => {
              refetchMovies()
              refetchShows()
            }}
          >
            Try again
          </Button>
        </div>
      )
    if (!items?.length)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>Нет результатов</p>
        </div>
      )
    return items?.map((item) => <TrendingCard key={item.id} item={item} />)
  }

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
            variant={activeTab === "shows" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ tab: "shows" })}
          >
            Shows
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {content()}
      </div>
    </section>
  )
}
