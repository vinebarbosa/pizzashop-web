import { http, HttpResponse } from 'msw'

import {
  GET_POPULAR_PRODUCTS_URL,
  GetPopularProductsResponse,
} from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>(GET_POPULAR_PRODUCTS_URL, () => {
  return HttpResponse.json([
    { product: 'Pizza 01', amount: 123 },
    { product: 'Pizza 02', amount: 18 },
    { product: 'Pizza 03', amount: 55 },
    { product: 'Pizza 04', amount: 83 },
    { product: 'Pizza 05', amount: 22 },
  ])
})
