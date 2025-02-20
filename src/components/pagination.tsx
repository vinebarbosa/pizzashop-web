import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage?: number
  itensPerPage?: number
  totalOfItens?: number
  onPageChange: (pageindex: number) => void
}

export function Pagination({
  currentPage = 0,
  itensPerPage = 10,
  totalOfItens = 0,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalOfItens / itensPerPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalOfItens} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <span className="text-sm font-medium">
          Página {currentPage + 1} de {pages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
          >
            <ChevronsLeftIcon />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pages - 1}
          >
            <ChevronRightIcon />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={currentPage === pages - 1}
          >
            <ChevronsRightIcon />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
