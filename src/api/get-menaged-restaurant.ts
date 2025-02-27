import { api } from '@/lib/axios'

export interface GetManegedRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManegedRestaurant() {
  const response = await api.get<GetManegedRestaurantResponse>(
    '/managed-restaurant',
  )
  return response.data
}
