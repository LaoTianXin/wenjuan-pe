import React, { useEffect } from 'react'
import { Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getStatChartService } from '@/api'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { getComponentConfigByType } from '@/components/QuestionComponents'

const { Title, Paragraph } = Typography

const mockData = [
  { title: 'test1', count: 20 },
  { title: 'test2', count: 30 },
  { title: 'test3', count: 40 },
  { title: 'test4', count: 50 },
  { title: 'test5', count: 60 },
  { title: 'test6', count: 70 },
]

interface StatRightPanelPropsType {
  selectId: string
}

const StatRightPanel: React.FC<StatRightPanelPropsType> = ({ selectId }) => {
  const { componentList } = useGetComponentInfo()
  const { id } = useParams()
  const { data } = useRequest(() => getStatChartService({ id, fe_id: selectId }), {
    refreshDeps: [selectId, id],
  })

  const getChartElement = () => {
    if (!selectId) return <Title level={5}>当前没有选中的组件</Title>
    const type = componentList.find(item => item.fe_id === selectId)!.type

    const config = getComponentConfigByType(type)
    if (!config?.ChartComponent) return <Title level={5}>当前选中组件图表不存在</Title>

    const { ChartComponent } = config
    return (
      <div className="w-full h-[450px]">
        <ChartComponent data={data?.chartList} dataKey="count" nameKey="name"></ChartComponent>
      </div>
    )
  }

  return (
    <div className="h-full p-4">
      <Title className="mb-5 text-center" level={3}>
        图表统计
      </Title>
      {getChartElement()}
    </div>
  )
}

export default StatRightPanel
