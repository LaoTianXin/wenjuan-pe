import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { QuestionCheckboxChartProps } from './interface'

const ChartComponent = <T extends Record<string, string | number>>({
  dataKey = 'value',
  nameKey = 'name',
  data,
}: Partial<QuestionCheckboxChartProps<T>>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ChartComponent
