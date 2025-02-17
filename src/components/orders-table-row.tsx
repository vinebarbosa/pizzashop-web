import { CheckIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetail } from './order-detail'
import { Dialog, DialogTrigger } from './ui/dialog'

export function OrdersTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetail />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        o123h041dbiubsdf9a8
      </TableCell>
      <TableCell className="text-muted-foreground">Há 5 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Vinícios Barbosa da Silva</TableCell>
      <TableCell className="font-medium">R$ 124,90</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <CheckIcon className="size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <XIcon className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
