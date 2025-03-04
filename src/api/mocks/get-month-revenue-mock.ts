import { http, HttpResponse } from 'msw'

import {
  GET_MONTH_REVENUE_URL,
  GetMonthRevenueResponse,
} from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>(GET_MONTH_REVENUE_URL, () => {
  return HttpResponse.json({
    receipt: 12738.87,
    diffFromLastMonth: -2,
  })
})
