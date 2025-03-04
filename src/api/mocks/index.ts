import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'
import { getProfileMock } from './get-profile-mock'
import { getManegedRestaurantMock } from './get-menaged-restaurant-mock'
import { updateProfileMock } from './update-profile-mock'
import { getOrderMock } from './get-orders-mock'
import { getOrderDetailsMock } from './get-order-details-mock'
import { approveOrderMock } from './approve-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { cancelOrderMock } from './cancel-order-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDailyRevenueInPeriodMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getProfileMock,
  getManegedRestaurantMock,
  updateProfileMock,
  getOrderMock,
  getOrderDetailsMock,
  approveOrderMock,
  dispatchOrderMock,
  deliverOrderMock,
  cancelOrderMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
