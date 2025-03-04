import { http, HttpResponse } from 'msw'

import { RestaurantRegisterPayload } from '../restaurant-register'

export const registerRestaurantMock = http.post<
  never,
  RestaurantRegisterPayload
>('/restaurants', async ({ request }) => {
  const { restaurantName } = await request.json()

  if (restaurantName === 'Pizza Shop') {
    return new HttpResponse(null, { status: 201 })
  }

  return new HttpResponse(null, { status: 400 })
})
