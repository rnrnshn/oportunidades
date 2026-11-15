import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export type TuitionChartProps = {
  fees: Array<{
    item: string
    value: string
  }>
}

const COLORS = ['#205596 ', '#205596d1', '#205596ac', '#2055966e', '#20559621', '#20559695']

export function TuitionChart({ fees }: TuitionChartProps) {
  // Extract numeric values from strings like "MZN 7.000/semestre" or "MZN 600"
  const chartData = fees.map((fee, index) => {
    const numericValue = parseInt(fee.value.replace(/\D/g, ''), 10) || 0
    return {
      name: fee.item,
      amount: numericValue,
      fullLabel: fee.value,
      color: COLORS[index % COLORS.length],
    }
  })

  return (
    <div className="mt-8 w-full rounded-md border border-soft bg-white p-6">
      <h3 className="text-lg font-semibold text-navy mb-6">Fee Breakdown by Category</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 100, right: 30, left: 30, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={120}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Amount (MZN)',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => `MZN ${Number(value).toLocaleString('pt-PT')}`}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#001f3f' }}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-xs font-medium text-navy">{item.name}</p>
              <p className="text-xs text-muted">{item.fullLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
