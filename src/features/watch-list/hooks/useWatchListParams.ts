import { useSearchParams } from "react-router"
import type { SearchParams } from "../types"

export const useWatchListParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params: SearchParams = {
    tab: (searchParams.get("tab") || "all") as SearchParams["tab"],
    layout: (searchParams.get("layout") || "list") as SearchParams["layout"],
    sort: (searchParams.get("sort") || "recentlyAdded") as SearchParams["sort"],
  }
  const tab = params.tab
  const layout = params.layout
  const sort = params.sort

  const handleParamChange = (param: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(param, value)
      return prev
    })
  }

  return { tab, layout, sort, handleParamChange }
}
