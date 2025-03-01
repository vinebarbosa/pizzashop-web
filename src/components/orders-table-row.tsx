import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetail } from './order-detail'
import { OrderStatus } from './order-status'
import { Dialog, DialogTrigger } from './ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'


import { cancelOrder as cancelOrderFn } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { toast } from 'sonner'

interface OrdersTableRowProps {
  data: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrdersTableRow({
  data: { createdAt, customerName, orderId, status, total },
}: OrdersTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient()


  const { mutate: cancelOrder } = useMutation({
    mutationFn: cancelOrderFn,
    async onSuccess(_, { orderId }) {
      toast.success("O pedido foi cancelado")

      const cached = queryClient.getQueriesData<GetOrdersResponse>({ queryKey: ['orders'] })
      cached.forEach(([cachedQuery, cachedData]) => {
        if (!cachedData) return

        queryClient.setQueryData<GetOrdersResponse>(cachedQuery, {
          ...cachedData,
          orders: cachedData.orders.map(order => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled'
              }
            }

            return order
          })
        })
      })
    }
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetail orderId={orderId} isDetailsOpen={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(createdAt, { locale: ptBR, addSuffix: true })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {(total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <CheckIcon className="size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs" onClick={() => cancelOrder({ orderId })} disabled={!['pending', 'processing'].includes(status)}>
          <XIcon className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
