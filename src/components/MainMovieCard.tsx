import {
  BookmarkSimpleIcon,
  DotIcon,
  PlayIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import dune from "../assets/dune.png"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

export function MainMovieCard() {
  return (
    <Card className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-2xl bg-card p-4 md:flex-row">
      <img
        src={dune}
        alt="Dune: Part Two"
        className="aspect-video w-full rounded-lg object-cover md:max-w-sm"
      />
      <div className="flex flex-col gap-4 py-4">
        <CardHeader className="p-0">
          <Badge>
            <TrendUpIcon size={32} />
            <span>В тренде</span>
          </Badge>
          <CardTitle className="text-lg font-semibold">
            Dune: Part Two
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sm font-medium">2024</span>
            <DotIcon size={24} />
            <span className="text-sm font-medium text-primary">8.7</span>
            <DotIcon size={24} />
            <span className="text-sm font-medium">2ч 46мин</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="xs font-semibold">
              Sci-Fi
            </Badge>
            <Badge variant="secondary" className="xs font-semibold">
              Adventure
            </Badge>
            <Badge variant="secondary" className="xs font-semibold">
              Drama
            </Badge>
          </div>
          <p className="max-w-prose">
            Paul Atreides unites with Chani and Giedi Prime to lead a rebellion
            against the Harkonnens.
          </p>
        </CardContent>
        <CardFooter className="flex items-center gap-2 p-0">
          <Button>
            <PlayIcon size={24} />
            <span className="text-sm font-medium">Watch Trailer</span>
          </Button>
          <Button>
            <BookmarkSimpleIcon size={24} />
            <span className="text-sm font-medium">Watchlist</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
