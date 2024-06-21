import React, { FC, useEffect } from 'react'
import { Card, Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { StorageKeyEnum } from '../enum/StorageEnum'

const rememberUserInfo = (username: string, password: string) => {
  localStorage.setItem(StorageKeyEnum.USERNAME, username)
  localStorage.setItem(StorageKeyEnum.PASSWORD, password)
}

const removeUserInfo = () => {
  localStorage.removeItem(StorageKeyEnum.USERNAME)
  localStorage.removeItem(StorageKeyEnum.PASSWORD)
}

const getUserInfo = () => {
  const username = localStorage.getItem(StorageKeyEnum.USERNAME) || ''
  const password = localStorage.getItem(StorageKeyEnum.PASSWORD) || ''
  return { username, password }
}

const Login: FC = () => {
  interface FormData {
    username: string
    password: string
    remember: boolean
  }

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    const { password, username } = getUserInfo()
    form.setFieldsValue({
      password,
      username,
    })
  }, [])

  const onFinish = (formData: FormData) => {
    console.log(formData)
    const { remember, username, password } = formData

    if (remember) {
      rememberUserInfo(username, password)
    } else {
      removeUserInfo()
    }
  }

  const FormElement = (
    <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
      <Form.Item
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            type: 'string',
            min: 5,
            max: 16,
            message: '用户名在5-16位之间',
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含字母、数字、下划线',
          },
        ]}
        name="username"
        label="用户名"
      >
        <Input></Input>
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码至少8位，包含大小写字母和数字',
          },
        ]}
        name="password"
        label="密码"
      >
        <Input.Password></Input.Password>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }} name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Link to={PathNameEnum.REGISTER}>去注册</Link>
        </Space>
      </Form.Item>
    </Form>
  )

  return (
    <div
      style={{ backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)' }}
      className="flex min-h-[calc(100vh-65px-65px)] items-center justify-center"
    >
      <Card>
        <Space direction="vertical" align="center" size="large">
          <Space>
            <Typography.Title level={3}>
              <LoginOutlined />
            </Typography.Title>
            <Typography.Title level={3}>登录</Typography.Title>
          </Space>
          {FormElement}
        </Space>
      </Card>
    </div>
  )
}

export default Login
