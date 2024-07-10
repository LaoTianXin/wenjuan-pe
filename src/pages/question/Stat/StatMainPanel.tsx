import React from 'react'
import { Table, TableColumnsType, Pagination, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { getStatService } from '@/api'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { getComponentConfigByType } from '@/components/QuestionComponents'
import { DefaultSearchParams } from '@/enum/SearchEnum'

interface StatMainPanelPropsType {
  selectId: string
  updateSelectId: (id: string) => void
}

const { Title } = Typography

const StatMainPanel: React.FC<StatMainPanelPropsType> = ({ selectId, updateSelectId }) => {
  const { showComponentList } = useGetComponentInfo()
  const { id } = useParams()
  const [statList, setStatList] = React.useState<StatServer.ComponentType[]>([])

  const [statPageSize, setStatPageSize] = React.useState(DefaultSearchParams.PAGE_SIZE)
  const [statPage, setStatPage] = React.useState(DefaultSearchParams.PAGE)

  const [total, setTotal] = React.useState(0)

  const { loading } = useRequest(
    () => getStatService({ pageSize: statPageSize, page: statPage, id }),
    {
      onSuccess({ total, list }) {
        setTotal(total)
        setStatList(list)
      },
      refreshDeps: [statPageSize, statPage, id],
    }
  )

  const showStatList = showComponentList.filter(item => {
    const config = getComponentConfigByType(item.type)
    return config?.group === 'QuestionFormGroup'
  })

  const columns: TableColumnsType = showStatList.map(item => {
    const config = getComponentConfigByType(item.type)
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
      width: config?.meta?.tableWidth ? config?.meta?.tableWidth : 'auto',
      align: 'center',
    }
  })

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <Title level={3}>当前答卷数量{total}</Title>
      <Table
        loading={loading}
        rowKey={'_id'}
        columns={columns}
        pagination={false}
        dataSource={statList}
        scroll={{ x: 600, y: 650 }}
      />
      <Pagination
        className="mt-4"
        pageSize={statPageSize}
        current={statPage}
        total={total}
        onChange={setStatPage}
        onShowSizeChange={current => {
          setStatPage(current)
          setStatPageSize(1)
        }}
      ></Pagination>
    </div>
  )
}

export default StatMainPanel
