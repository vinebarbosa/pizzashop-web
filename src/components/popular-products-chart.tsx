import {

  Pie,
  PieChart,
  ResponsiveContainer,
  Cell
} from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card'
import { BarChartIcon } from 'lucide-react'
import colors from 'tailwindcss/colors'

const data = [
  { product: 'Pepperoni', amount: 30 },
  { product: 'Mussarela', amount: 20 },
  { product: '4 Queijos', amount: 55 },
  { product: 'Calabresa', amount: 18 },
  { product: 'Frango com Catupirí', amount: 32 },
]


const COLORS = [
  colors.amber[500],
  colors.sky[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares

          </CardTitle>
          <BarChartIcon className='size-4 text-muted-foreground' />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart  style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              strokeWidth={8}
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat('...')
                      : data[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`}
                  fill={COLORS[index]}
                  className='stroke-background hover:opacity-80 transition-colors'
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
