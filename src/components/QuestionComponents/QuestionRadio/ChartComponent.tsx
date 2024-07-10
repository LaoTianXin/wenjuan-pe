import React, { useMemo } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { QuestionRadioChartProps } from './interface'
import { getRandomColor } from '@/utils'

const ChartComponent = <T extends Record<string, string | number>>({
  dataKey = 'value',
  nameKey = 'name',
  data = [],
}: Partial<QuestionRadioChartProps<T>>) => {
  const sum = useMemo(() => data.reduce((prev, curr) => prev + +curr[dataKey], 0), [data])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          isAnimationActive={false}
          dataKey={dataKey}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={item => {
            return `${item[nameKey]}(${((item[dataKey] / sum) * 100).toFixed(2)}%)`
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ChartComponent
