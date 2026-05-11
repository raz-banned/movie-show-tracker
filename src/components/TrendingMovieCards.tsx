import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Link } from "react-router"
import { useState } from "react"
import { useTrendingMovies } from "@/hooks/useTrendingMovies"
import { TrendingMovieCard } from "./TrendingMovieCard"

export function TrendingMovieCards() {
  const [activeTab, setActiveTab] = useState("movies")
  const { movies, isPending, error, refetch } = useTrendingMovies()

  if (isPending) return <div>Loading...</div>
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Не удалось загрузить фильмы</p>
        <Button onClick={() => refetch()}>Попробовать снова</Button>
      </div>
    )
  }
  if (!movies?.length) return <div>No results</div>

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Сейчас в тренде</h2>
          <Button asChild variant="link">
            <Link to="/trending" className="flex items-center">
              <span>Все</span>
              <ArrowRightIcon size={24} />
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "movies" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("movies")}
          >
            Фильмы
          </Button>
          <Button
            variant={activeTab === "shows" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("shows")}
          >
            Сериалы
          </Button>
        </div>
      </div>
      <TrendingMovieCard />
    </section>
  )
}
