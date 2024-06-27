import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Link, useNavigate } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { StorageKeyEnum } from '../enum/StorageEnum'
import { userLoginService } from '../api'
import { loginReducer } from '@/store/userReducer'

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

  const nav = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    const { password, username } = getUserInfo()
    form.setFieldsValue({
      password,
      username,
    })
  }, [])

  const { run: userLogin, loading } = useRequest(userLoginService, {
    manual: true,
    onSuccess(res) {
      if (res.token) {
        dispatch(loginReducer({ token: res.token }))
        message.success('登录成功')
        nav(PathNameEnum.HOME)
      }
    },
  })

  const onFinish = (formData: FormData) => {
    const { remember, username, password } = formData
    userLogin({ username, password })
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
            message: '密码至少8位大小写字母数字',
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
          <Button loading={loading} type="primary" htmlType="submit">
            登录
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
      <div className="w-[350px] h-[350px] bg-white rounded-xl p-5 flex flex-col justify-center items-center">
        <Space direction="vertical" align="center" size="large">
          <Space>
            <Typography.Title level={3}>
              <LoginOutlined />
            </Typography.Title>
            <Typography.Title level={3}>登录</Typography.Title>
          </Space>
          {FormElement}
        </Space>
      </div>
    </div>
  )
}

export default Login
