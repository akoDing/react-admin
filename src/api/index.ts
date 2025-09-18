import { store } from "@/redux";
import { message } from "antd";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import NProgress from 'nprogress';
import { checkStatus } from "./helper/checkStatus";
import { AxiosCancel } from "./helper/axiosCancel";

const axiosCancel = new AxiosCancel()

const config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true
}

class RequestHttp {
    service: AxiosInstance
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config)
        // 配置请求拦截器
        this.service.interceptors.request.use((config) => {
            NProgress.start()
            // const token = store.getState().user.token
            const token = store.getState().global.token
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            axiosCancel.addPending(config)
            return config
        }, (error) => {
            return Promise.reject(error)
        })

        // 配置响应拦截器
        this.service.interceptors.response.use((response: AxiosResponse) => {
            const { data, config } = response
            NProgress.done()
            axiosCancel.removePending(config)
            if (data.code && data.code !== 200) {
                message.error(data.msg || '请求失败')
                return Promise.reject(data)
            }
            return data
        }, (error) => {
            NProgress.done()
            const { response } = error
            if (response) {
                if (response.status === 401) {
                    // store.dispatch(setToken(''))
                    // store.dispatch(setUserInfo(''))
                    message.error('登录过期，请重新登录')
                    window.location.href = '/login'
                    return Promise.reject(error)
                }
                // 请求超时
                if (error.message.includes('timeout')) {
                    message.error('请求超时，请稍后重试')
                    return Promise.reject(error)
                }
                if (response) {
                    checkStatus(response.status)
                }
                return Promise.reject(error)
            }
            // 处理网络错误
            message.error('网络连接失败，请检查网络设置')
            return Promise.reject(error)
        })
    }
}

// 创建并导出一个RequestHttp实例
export default new RequestHttp(config)