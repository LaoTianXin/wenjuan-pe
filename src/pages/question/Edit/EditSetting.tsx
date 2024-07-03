import { Form, Input } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetPageInfoReducer } from '@/store/pageInfoReducer'
import { PageInfoType } from '@/store/pageInfoReducer'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'

const EditSetting: FC = () => {
  const dispatch = useDispatch()
  const { title, desc, js, css } = useGetPageInfo()
  const [form] = Form.useForm<PageInfoType>()

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  const handleFormValuesChange = () => {
    const values = form.getFieldsValue()
    dispatch(resetPageInfoReducer(values))
  }
  return (
    <Form layout="vertical" onValuesChange={() => handleFormValuesChange()} form={form}>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input value={title} />
      </Form.Item>
      <Form.Item name="desc" label="描述">
        <Input value={desc} />
      </Form.Item>
      <Form.Item name="js" label="js脚本">
        <Input.TextArea value={js} />
      </Form.Item>
      <Form.Item name="css" label="css样式">
        <Input.TextArea value={css} />
      </Form.Item>
    </Form>
  )
}

export default EditSetting
