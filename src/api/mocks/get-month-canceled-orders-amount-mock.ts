import { http, HttpResponse } from 'msw'

import {
  GetMonthCanceledOrdersAmountResponse,
  URL,
} from '../get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>(URL, () => {
  return HttpResponse.json({
    amount: 39,
    diffFromLastMonth: -22,
  })
})
