import { message } from "antd"

export const checkStatus = (status: number) => {
    switch (status) {
        case 403:
            message.error('拒绝访问')
            break
        case 404:
            message.error('请求资源不存在')
            break
        default:
            return 'error'
    }
}
