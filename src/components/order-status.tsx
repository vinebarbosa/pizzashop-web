import { cn } from '@/lib/utils'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em rota',
  processing: 'Em prepero',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('size-2 rounded-full', {
          'bg-slate-400': status === 'pending',
          'bg-rose-500': status === 'canceled',
          'bg-emerald-500': status === 'delivered',
          'bg-amber-500': ['delivering', 'processing'].includes(status),
        })}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
