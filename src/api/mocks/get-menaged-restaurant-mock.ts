import { http, HttpResponse } from 'msw'

import { GetManegedRestaurantResponse } from '../get-menaged-restaurant'

export const getManegedRestaurantMock = http.get<
  never,
  never,
  GetManegedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'restaurant-id',
    createdAt: new Date(),
    description: 'restaurant description',
    managerId: 'manager-id',
    name: 'Pizza Shop',
    updatedAt: new Date(),
  })
})
