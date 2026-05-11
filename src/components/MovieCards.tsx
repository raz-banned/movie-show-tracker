import {
  ArrowRightIcon,
  BookmarkSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import oppenheimer from "../assets/oppenheimer.png"
import { Link } from "react-router"
import { useState } from "react"

export function MovieCards() {
  const [activeTab, setActiveTab] = useState("movies")
  const [isBookmarked, setIsBookmarked] = useState(false)

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <Card className="relative transform overflow-hidden rounded-md p-0 transition-transform hover:-translate-y-1">
          <div className="aspect-2/3 w-full overflow-hidden">
            <img
              src={oppenheimer}
              alt="Oppenheimer"
              className="h-full w-full object-cover"
            />
          </div>
          <CardHeader className="flex flex-col p-2">
            <span className="absolute top-2 right-2 rounded-sm bg-accent p-1 text-xs text-accent-foreground">
              8.4
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
            <CardTitle className="truncate text-sm">Oppenheimer</CardTitle>
            <CardDescription className="text-xs">2023</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
