import { SearchIcon } from 'lucide-react'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { TableCell, TableRow } from './ui/table'

export function OrderTableRowSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Button disabled variant="outline" size="xs">
          <SearchIcon className="size-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[172px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[148px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[110px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[64px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>
    </TableRow>
  ))
}
