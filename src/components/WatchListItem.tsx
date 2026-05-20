import { DotIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export function WatchListItem() {
  return (
    <ul className="mx-auto w-full max-w-2xl flex-1">
      <li className="flex h-28 justify-between gap-4 rounded-sm border border-border bg-accent p-4 transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-6">
          <div className="h-18 w-12 shrink-0">
            <img
              src="https://picsum.photos/200/300"
              alt="Empty"
              className="h-full w-full rounded-sm bg-gray-400"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-between self-stretch py-1">
            <h2 className="line-clamp-2 text-lg font-semibold">
              Dune: Part two111
            </h2>
            <div className="flex">
              <span className="text-sm text-muted-foreground">2024</span>
              <DotIcon size={20} />
              <span className="text-sm text-primary">8.7</span>
            </div>
            <ul className="flex gap-1">
              <li>
                <Badge variant="outline">sci-fi</Badge>
              </li>
              <li>
                <Badge variant="outline">Adventure</Badge>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full flex-col items-end justify-end gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex flex-col gap-2">
            <Badge className="">Watching</Badge>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </div>
          <Button variant="destructive" className="w-full md:w-auto">
            Remove
          </Button>
        </div>
      </li>
    </ul>
  )
}
