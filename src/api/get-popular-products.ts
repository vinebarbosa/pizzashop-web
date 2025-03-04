import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export const GET_POPULAR_PRODUCTS_URL = '/metrics/popular-products'

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    GET_POPULAR_PRODUCTS_URL,
  )
  return response.data
}
