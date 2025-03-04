import { http, HttpResponse } from 'msw'

import type {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({ params }) => {
  const orderId = params.orderId

  return HttpResponse.json({
    id: orderId,
    customer: {
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      phone: '128821821',
    },
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: { name: 'Pizza de calabresa' },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 1500,
        product: { name: 'Pizza de frango com catupiry' },
        quantity: 2,
      },
    ],
    status: 'pending',
    totalInCents: 4000,
  })
})
