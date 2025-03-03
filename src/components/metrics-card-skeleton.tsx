import { Skeleton } from './ui/skeleton'

export function MetricsCardSkeleton() {
  return (
    <>
      <Skeleton className="h-7 w-24 mt-1" />
      <Skeleton className="h-4 w-52" />
    </>
  )
}
