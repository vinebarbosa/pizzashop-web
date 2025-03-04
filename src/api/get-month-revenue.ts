import { api } from '@/lib/axios'

export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}

export const GET_MONTH_REVENUE_URL = '/metrics/month-receipt'

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(GET_MONTH_REVENUE_URL)
  return response.data
}
