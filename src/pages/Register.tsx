import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { userRegisterService } from '../api'
const Register: FC = () => {
  interface FormData {
    username: string
    nickname: string
    password: string
    confirmPassword: string
  }

  const nav = useNavigate()

  const { run: userRegister, loading } = useRequest(userRegisterService, {
    manual: true,
    onSuccess() {
      message.success('注册成功')
      // 跳转到登录页面
      nav(PathNameEnum.LOGIN)
    },
  })

  const onFinish = (formData: FormData) => {
    const { username, nickname, password, confirmPassword } = formData
    if (password !== confirmPassword) return
    userRegister({ username, nickname, password })
  }

  const FormElement = (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
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
            message: '请输入昵称',
          },
          {
            type: 'string',
            min: 3,
            max: 16,
            message: '昵称在3-16位之间',
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '昵称只能包含字母、数字、下划线',
          },
        ]}
        name="nickname"
        label="昵称"
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
            message: '密码至少8位大小写字母数字',
          },
        ]}
        name="password"
        label="密码"
      >
        <Input.Password></Input.Password>
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: '请再次输入密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              } else {
                return Promise.reject(new Error('两次输入的密码不一致'))
              }
            },
          }),
        ]}
        dependencies={['password']}
        name="confirmPassword"
        label="确认密码"
      >
        <Input.Password></Input.Password>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space>
          <Button loading={loading} type="primary" htmlType="submit">
            注册
          </Button>
          <Link to={PathNameEnum.LOGIN}>已注册，登录</Link>
        </Space>
      </Form.Item>
    </Form>
  )

  return (
    <div
      style={{ backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)' }}
      className="flex min-h-[calc(100vh-65px-65px)] items-center justify-center"
    >
      <div className="w-[350px] h-[400px] bg-white rounded-xl p-5 flex flex-col justify-center items-center">
        <Space direction="vertical" align="center" size="large">
          <Space>
            <Typography.Title level={3}>
              <UserAddOutlined />
            </Typography.Title>
            <Typography.Title level={3}>新用户注册</Typography.Title>
          </Space>
          {FormElement}
        </Space>
      </div>
    </div>
  )
}

export default Register
