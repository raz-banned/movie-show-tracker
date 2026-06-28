import { useSearchParams } from "react-router"

export const useWatchListParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const tab = searchParams.get("tab") || "all"
  const layout = searchParams.get("layout") || "list"
  const sort = searchParams.get("sort") || "recentlyAdded"

  const handleParamChange = (param: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(param, value)
      return prev
    })
  }

  return { tab, layout, sort, handleParamChange }
}
