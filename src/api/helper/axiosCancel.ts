import type { AxiosRequestConfig, Canceler } from "axios";
import axios from "axios";
import qs from 'qs'

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')

const pendingMap = new Map<string, Canceler>()

export class AxiosCancel {
    // 添加请求
    addPending(config: AxiosRequestConfig) {
        // 取消之前的请求
        this.removePending(config)
        const url = getPendingUrl(config)
        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
            if (!pendingMap.has(url)) {
                pendingMap.set(url, cancel)
            }
        })
    }
    // 取消请求
    removeAllPending() {
        pendingMap.forEach((cancel) => {
            cancel && typeof cancel === 'function' && cancel()
        })
        pendingMap.clear()
    }
    // 移除请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config)
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url)
            cancel && typeof cancel === 'function' && cancel()
            pendingMap.delete(url)
        }
    }
    // 重置
    reset() {
        pendingMap.clear()
    }
}