import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function MainCardSkeleton() {
  return (
    <Card className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-6 transition-transform hover:scale-101 md:flex-row md:items-center">
      <div className="w-full md:w-2/5">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32 rounded" />
          <Skeleton className="h-9 w-28 rounded" />
        </div>
      </div>
    </Card>
  )
}
