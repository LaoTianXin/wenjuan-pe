import React from 'react'
import { Input, Select, Checkbox, Form, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { PropComponentConfigType, createPropComponent } from '../utilComponent/createPropComponent'
import { QuestionRadioPropsType } from './interface'

const propComponentList: PropComponentConfigType<QuestionRadioPropsType> = ({
  form,
  options = [],
}) => {
  const RadioGroup = (
    <Form.List name="options">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...prop }) => {
            return (
              <Space align="baseline" key={key}>
                <Form.Item
                  rules={[
                    { required: true, message: '选项不能为空' },
                    {
                      validator: (_, value) => {
                        const { options = [] } = form?.getFieldsValue() || {}
                        let index = 0
                        for (let v of options) {
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
      render: RadioGroup,
    },
    {
      formItemProps: {
        label: '默认选中',
        name: 'value',
      },
      render: <Select options={options}></Select>,
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
