import { DotIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { useSearchParams } from "react-router"
import { WatchListControls } from "./WatchListControls"

export function WatchListHeader() {
  const [searchParam, setSearchParam] = useSearchParams({
    tab: "all",
    layout: "list",
  })
  const tab = searchParam.get("tab")!
  const layout = searchParam.get("layout")!

  const handleParamChange = (param: string, value: string) => {
    setSearchParam((prev) => {
      prev.set(param, value)
      return prev
    })
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:justify-evenly">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <h2 className="text-xl font-semibold">Watch list</h2>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">6 movies</span>
            <DotIcon size={20} />
            <span className="text-sm text-muted-foreground">2 shows</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={tab === "all" ? "default" : "outline"}
            onClick={() => handleParamChange("tab", "all")}
          >
            All
          </Button>
          <Button
            variant={tab === "movies" ? "default" : "outline"}
            onClick={() => handleParamChange("tab", "movies")}
          >
            Movies
          </Button>
          <Button
            variant={tab === "shows" ? "default" : "outline"}
            onClick={() => handleParamChange("tab", "shows")}
          >
            Shows
          </Button>
        </div>
      </div>

      <WatchListControls layout={layout} onParamChange={handleParamChange} />
    </div>
  )
}
