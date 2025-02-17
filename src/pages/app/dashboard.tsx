import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from '@/components/day-orders-amount'
import { MonthCanceledOrdersAmountCard } from '@/components/month-canceled-orders-amount'
import { MonthOrdersAmountCard } from '@/components/month-orders-amount'
import { MonthRevenueCard } from '@/components/month-revenue-card'
import { RevenuesChart } from '@/components/revenues-chart'
import { PopularProductsChart } from '@/components/popular-products-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenuesChart />
          <PopularProductsChart/>
        </div>
      </div>
    </>
  )
}
