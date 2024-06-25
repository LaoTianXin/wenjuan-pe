import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import { message } from 'antd'
import store from '@/store'

class AxiosRequest {
  private instance: AxiosInstance
  private readonly options: AxiosRequestConfig
  private pending: Map<string, Canceler>

  constructor(options: AxiosRequestConfig) {
    this.options = options
    this.instance = axios.create(options)
    this.pending = new Map()

    // 绑定拦截器
    this.initInterceptors()
  }

  // 生成请求Key
  private getReqKey(config: AxiosRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  // 添加请求
  private addReq(config: AxiosRequestConfig) {
    const requestKey = this.getReqKey(config)

    config.cancelToken = new axios.CancelToken(cancel => {
      if (!this.pending.has(requestKey)) {
        // 如果 pending 中不存在当前请求，则添加进去
        this.pending.set(requestKey, cancel)
      }
    })
  }

  // 移除请求
  private removeReq(config: AxiosRequestConfig) {
    const requestKey = this.getReqKey(config)

    if (this.pending.has(requestKey)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = this.pending.get(requestKey)
      cancel!(requestKey)
      this.pending.delete(requestKey)
    }
  }

  // 初始化拦截器
  private initInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        const token = store.getState()?.user?.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // 移除相同请求
        this.removeReq(config)
        // 添加新请求
        this.addReq(config)
        return config
      },
      err => Promise.reject(err)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      res => {
        // 请求成功后移除请求
        this.removeReq(res.config)
        const responseData: BaseResponseType = res.data || {}
        const { errno, data, msg } = responseData
        if (errno !== 0) {
          message.error(msg)
          return Promise.reject(msg)
        } else {
          return Promise.resolve(data)
        }
      },
      err => {
        // 请求失败也需要移除请求
        if (err.code === 'ERR_CANCELED') {
          return Promise.reject('请求取消')
        }
        err.config && this.removeReq(err.config)
        return Promise.reject(err)
      }
    )
  }

  // 对外接口: get请求
  public get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.instance.get<T>(url, config) as Promise<T>
  }

  // 对外接口: post请求
  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config) as Promise<T>
  }

  // 对外接口: put请求
  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, config) as Promise<T>
  }

  // 对外接口: patch请求
  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(url, data, config) as Promise<T>
  }

  // 对外接口: delete请求
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config) as Promise<T>
  }
}

const timeout = 10000
const axiosRequest = new AxiosRequest({ timeout })

export default axiosRequest
