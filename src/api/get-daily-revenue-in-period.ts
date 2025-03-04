import { api } from '@/lib/axios'

export interface GetDailyRevenueInPeriodParams {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export const GET_DAILY_REVENUE_IN_PERIOD = '/metrics/daily-receipt-in-period'

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodParams) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    GET_DAILY_REVENUE_IN_PERIOD,
    {
      params: { from, to },
    },
  )
  return response.data
}
