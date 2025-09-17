import { store } from "@/redux"
import type { JSX } from "react"
import { Navigate, useLocation } from "react-router-dom"

// 路由守卫组件
const AuthRouter = (props: {children: JSX.Element}) => {
    // 获取路由信息
    const { pathname } = useLocation()
    // 判断是否有token
    const token = store.getState().global.token

    if (!token) {
        if (pathname !== '/login') {
            return <Navigate to="/login" replace />
        } else {
            return props.children
        }
    }

    if (pathname === '/login') {
        // 跳转到系统中
        return <Navigate to="/loading" replace />
    }

    // 获取权限路由
    const dynamicRoutes = store.getState().auth.authRouter
    console.log(dynamicRoutes)

    const staticRouter = ["/", "/loading", "/403", "/404"]
    const routerList = [...dynamicRoutes, ...staticRouter]

    if (!routerList.includes(pathname)) {
        // 没有权限访问
        return <Navigate to="/403" replace />
    }

    return props.children
}

export default AuthRouter
