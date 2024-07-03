import React, { ReactNode, useEffect } from 'react'
import { Form, FormInstance, FormItemProps } from 'antd'
import { ComponentPropsType } from '../index'

export interface ComponentRenderProps {
  render: ReactNode
  required?: boolean
  formItemProps?: FormItemProps<ComponentPropsType>
}

export interface PublicProps<T extends ComponentPropsType = any> {
  onChange: (prop: T) => void
  locked: boolean
}

export type PropComponentConfigType<T extends ComponentPropsType = any> = (
  componentConfig: T & { form?: FormInstance<T> }
) => ComponentRenderProps[]

export const createPropComponent = (componentConfig: PropComponentConfigType) => {
  const PropComponent = ({
    onChange,
    locked,
    ...prop
  }: ComponentPropsType & PublicProps<ComponentPropsType>) => {
    const [form] = Form.useForm<ComponentPropsType>()

    useEffect(() => {
      form.setFieldsValue(prop)
    }, [...Object.values(prop)])

    const handleFormChange = () => {
      const props = form.getFieldsValue()
      onChange(props)
    }

    const componentRenderList = componentConfig({ form, ...prop })

    return (
      <Form
        disabled={locked}
        layout="vertical"
        initialValues={prop}
        onFieldsChange={handleFormChange}
        form={form}
      >
        {componentRenderList.map(({ render, required, formItemProps = {} }, index) => {
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
