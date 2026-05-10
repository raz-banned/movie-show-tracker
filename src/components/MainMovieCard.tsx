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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"

export function MainMovieCard() {
  return (
    <Card className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-4 pt-4 transition-transform hover:scale-101 md:flex-row md:items-start">
      <div className="md:max-w-sm">
        <img
          src={dune}
          alt="Dune: Part Two"
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <CardHeader className="p-0">
          <Badge>
            <TrendUpIcon size={32} />
            <span className="text-xs">В тренде</span>
          </Badge>
          <CardTitle className="text-xl font-semibold">
            Dune: Part Two
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sm font-medium">2024</span>
            <DotIcon size={24} />
            <span className="text-sm font-semibold text-primary">8.7</span>
            <DotIcon size={24} />
            <span className="text-sm font-medium">2ч 46мин</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-semibold">
              Sci-Fi
            </Badge>
            <Badge variant="secondary" className="text-xs font-semibold">
              Adventure
            </Badge>
            <Badge variant="secondary" className="text-xs font-semibold">
              Drama
            </Badge>
          </div>
          <p className="max-w-prose">
            Paul Atreides unites with Chani and Giedi Prime to lead a rebellion
            against the Harkonnens.
          </p>
        </CardContent>
        <CardFooter className="flex items-center gap-2 p-0">
          <Dialog>
            <Button asChild>
              <DialogTrigger>
                <PlayIcon size={24} />
                <span className="text-sm font-semibold">Watch Trailer</span>
              </DialogTrigger>
            </Button>
            <DialogContent>
              <DialogTitle>Trailer - Dune: Part Two</DialogTitle>
              <div className="aspect-video w-full rounded-lg bg-black">
                <iframe
                  src="https://www.youtube.com/embed/8g18jFHCLXk"
                  title="Dune: Part Two Trailer"
                  allowFullScreen
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <BookmarkSimpleIcon size={24} />
            <span className="text-sm font-medium">Watchlist</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
