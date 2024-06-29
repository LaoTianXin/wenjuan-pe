import React, { ReactNode, useEffect } from 'react'
import { Form, FormItemProps } from 'antd'
import { ComponentPropsType } from './index'

export interface CreatePropComponentPropsType {
  render: ReactNode
  required?: boolean
  formItemProps?: FormItemProps
}

export interface PublicProps {
  onChange: (prop: ComponentPropsType) => void
  locked: boolean
}

export const createPropComponent = (componentConfig: CreatePropComponentPropsType[]) => {
  const PropComponent = ({ onChange, locked, ...prop }: ComponentPropsType & PublicProps) => {
    const [form] = Form.useForm()
    useEffect(() => {
      form.setFieldsValue(prop)
    }, [prop])

    const handleFormChange = () => {
      const props = form.getFieldsValue()
      onChange(props)
    }

    return (
      <Form
        disabled={locked}
        layout="vertical"
        initialValues={prop}
        onFieldsChange={handleFormChange}
        form={form}
      >
        {componentConfig.map(({ render, required, formItemProps = {} }, index) => {
          return (
            <Form.Item
              key={index}
              rules={
                required
                  ? [{ required: true, message: `${formItemProps.label || ''}不能为空` }]
                  : []
              }
              {...formItemProps}
            >
              {render}
            </Form.Item>
          )
        })}
      </Form>
    )
  }

  return PropComponent
}
