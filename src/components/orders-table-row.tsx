import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveOrder as approveOrderFn } from '@/api/approve-order'
import { cancelOrder as cancelOrderFn } from '@/api/cancel-order'
import { deliverOrder as deliverOrderFn } from '@/api/deliver-order'
import { dispatchOrder as dispatchOrderFn } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetail } from './order-detail'
import { OrderStatus } from './order-status'
import { Dialog, DialogTrigger } from './ui/dialog'

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

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    cached.forEach(([cachedQuery, cachedData]) => {
      if (!cachedData) return

      queryClient.setQueryData<GetOrdersResponse>(cachedQuery, {
        ...cachedData,
        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            }
          }

          return order
        }),
      })
    })
  }

  const { mutate: approveOrder, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrderFn,
    async onSuccess(_, { orderId }) {
      toast.success('O pedido está em preparo')
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const { mutate: dispatchOrder, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrderFn,
    async onSuccess(_, { orderId }) {
      toast.success('O pedido está em rota de entrega')
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  const { mutate: deliverOrder, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrderFn,
    async onSuccess(_, { orderId }) {
      toast.success('O pedido foi entregue')
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })

  const { mutate: cancelOrder, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrderFn,
    async onSuccess(_, { orderId }) {
      toast.success('O pedido foi cancelado')
      updateOrderStatusOnCache(orderId, 'canceled')
    },
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
        {(total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={() => approveOrder({ orderId })}
          >
            <CheckIcon className="size-3" />
            Aprovar
          </Button>
        )}
        {status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrder({ orderId })}
          >
            <CheckIcon className="size-3" />
            Em entrega
          </Button>
        )}
        {status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrder({ orderId })}
          >
            <CheckIcon className="size-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => cancelOrder({ orderId })}
          disabled={
            !['pending', 'processing'].includes(status) || isCancelingOrder
          }
        >
          <XIcon className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
