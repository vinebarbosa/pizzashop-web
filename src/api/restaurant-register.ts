import { api } from '@/lib/axios'

export interface RestaurantRegisterPayload {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function restaurantRegister({
  email,
  managerName,
  phone,
  restaurantName,
}: RestaurantRegisterPayload) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
