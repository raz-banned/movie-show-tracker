import { useSearchParams } from "react-router"

export const useWatchListParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: "all",
    layout: "list",
  })

  const tab = searchParams.get("tab")!
  const layout = searchParams.get("layout")!

  const handleParamChange = (param: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(param, value)
      return prev
    })
  }

  return { tab, layout, handleParamChange }
}
