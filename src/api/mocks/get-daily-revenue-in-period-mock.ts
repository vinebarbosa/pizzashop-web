import { http, HttpResponse } from 'msw'

import {
  GET_DAILY_REVENUE_IN_PERIOD,
  GetDailyRevenueInPeriodResponse,
} from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>(GET_DAILY_REVENUE_IN_PERIOD, () => {
  return HttpResponse.json([
    { date: '01/02/2025', receipt: 1200 },
    { date: '02/02/2025', receipt: 2000 },
    { date: '03/02/2025', receipt: 1800 },
    { date: '04/02/2025', receipt: 1700 },
    { date: '05/02/2025', receipt: 1990 },
    { date: '06/02/2025', receipt: 1000 },
    { date: '07/02/2025', receipt: 2000 },
  ])
})
