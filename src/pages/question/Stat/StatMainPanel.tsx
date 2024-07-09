import React from 'react'
import { Table, TableColumnsType } from 'antd'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import { getStatService } from '@/api'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { getComponentConfigByType } from '@/components/QuestionComponents'

interface StatMainPanelPropsType {
  selectId: string
  updateSelectId: (id: string) => void
}

const StatMainPanel: React.FC<StatMainPanelPropsType> = ({ selectId, updateSelectId }) => {
  const { showComponentList } = useGetComponentInfo()

  const [statList, setStatList] = React.useState<StatServer.ComponentType[]>([])

  const [total, setTotal] = React.useState(0)

  const { loading } = useRequest(() => getStatService(), {
    onSuccess({ total, list }) {
      setTotal(total)
      setStatList(list)
    },
  })

  const showStatList = showComponentList.filter(item => {
    const config = getComponentConfigByType(item.type)
    return config?.group === 'QuestionFormGroup'
  })

  const columns: TableColumnsType = showStatList.map(item => {
    return {
      title: () => (
        <div
          className={classNames(['cursor-pointer', { 'text-sky-500': selectId === item.fe_id }])}
          onClick={() => updateSelectId(item.fe_id)}
        >
          {item.props.title || item.title}
        </div>
      ),
      dataIndex: item.fe_id,
      width: item.type === 'QuestionTextArea' ? 200 : 'auto',
      align: 'center',
    }
  })

  return (
    <div className="max-w-[1000px] flex justify-center p-4">
      <Table
        loading={loading}
        rowKey={'_id'}
        columns={columns}
        pagination={false}
        dataSource={statList}
        scroll={{ x: 600, y: 600 }}
      />
    </div>
  )
}

export default StatMainPanel
