import React from 'react'
import { Input, Checkbox, Form, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { QuestionCheckboxPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { PropComponentConfigType, createPropComponent } from '../utilComponent/createPropComponent'

const propComponentList: PropComponentConfigType<QuestionCheckboxPropsType> = ({
  form,
  checkList = [],
}) => {
  const CheckboxGroup = (
    <Form.List name="checkList">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...prop }) => {
            return (
              <Space align="baseline" key={key}>
                <Form.Item {...prop} name={[name, 'checked']} valuePropName="checked">
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: '选项不能为空' },
                    {
                      validator: (_, value) => {
                        const { checkList = [] } = form?.getFieldsValue() || {}
                        let index = 0
                        for (let v of checkList) {
                          if (v.label === value) {
                            index++
                            if (index > 1) {
                              return Promise.reject('选项不能重复')
                            }
                          }
                        }

                        return Promise.resolve()
                      },
                    },
                  ]}
                  {...prop}
                  name={[name, 'label']}
                >
                  <Input></Input>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>
              </Space>
            )
          })}

          <Form.Item>
            <Button
              onClick={() => add({ value: nanoid(5), text: '' })}
              block
              type="link"
              icon={<PlusOutlined></PlusOutlined>}
            >
              添加选项
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )

  return [
    {
      formItemProps: {
        label: '单选标题',
        name: 'title',
      },
      render: <Input />,
      required: true,
    },
    {
      formItemProps: {
        label: '选项',
      },
      render: CheckboxGroup,
    },

    {
      formItemProps: {
        name: 'isVertical',
        valuePropName: 'checked',
      },
      render: <Checkbox>竖向排列</Checkbox>,
    },
  ]
}

export default createPropComponent(propComponentList)
