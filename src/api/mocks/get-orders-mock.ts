import { http, HttpResponse } from 'msw'

import type { OrderStatus } from '@/components/order-status'

import { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
]

export const orders: Orders = Array.from({ length: 60 }).map((_, index) => ({
  orderId: `order-${index + 1}`,
  createdAt: new Date().toISOString(),
  customerName: `Customer ${index + 1}`,
  status: statuses[index % 5],
  total: Math.round(Math.random() * 1000),
}))

export const getOrderMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const searchParams = new URL(request.url).searchParams

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const orderId = searchParams.get('orderId')

    const customerName = searchParams.get('customerName')

    const status = searchParams.get('status')

    let filteredOrders = orders

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
