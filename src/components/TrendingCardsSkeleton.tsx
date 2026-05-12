import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function TrendingCardsSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="flex max-w-60 flex-col gap-2 rounded-md p-0"
        >
          <Skeleton className="h-80 w-full rounded-md" />
          <div className="flex flex-col gap-2 p-2">
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-1/3 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  )
}
