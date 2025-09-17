import { Navigate, useRoutes } from 'react-router-dom';
import lazyLoad from './utils/lazyLoad';
import React from 'react';
import type { RouteObject } from './interface';
import { store } from '@/redux';
import LayoutIndex from './constant';
import NoPermission from '@/views/errorPage/403';
import NoFound from '@/views/errorPage/404';

// 导入modules文件夹下的路由文件
const metaRouters = import.meta.glob('./modules/*.tsx', {eager: true})
// 遍历metaRouters，将每个路由文件的default导出添加到rootRouter中
export const routerArray: RouteObject[] = []
Object.keys(metaRouters).forEach((item: string) => {
    Object.keys(metaRouters[item] as any).forEach(key => {
        routerArray.push(...(metaRouters[item] as any)[key])
    })
})

// 判断访问根节点时是否跳转到login页面
// function AuthWrapper() {
//     function handleAuthCheck() {
//         const userToken = store.getState().global.token
//         if (userToken) {
//             return <Navigate to="/sys/home" />
//         } else {
//             return <Navigate to="/login" />
//         }
//     }
//     return handleAuthCheck()
// }

const rootRouter = [
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/login',
        element: lazyLoad(React.lazy(() => import('@/views/login'))),
        meta: {
            requireAuth: false,
            title: '登录',
            key: 'login'
        }
    },
    {
        element: <LayoutIndex />,
        meta: {
            title: 'loading'
        },
        children: [
            {
                path: '/loading',
                element: lazyLoad(React.lazy(() => import('@/views/loading'))),
                meta: {
                    title: 'loading',
                    key: 'loading'
                }
            }
        ]
    },
    ...routerArray,
    {
        path: '*',
        element: <Navigate to="/404" />
    },
    {
        path: '/404',
        element: <NoFound />
    },
    {
        path: '/403',
        element: <NoPermission />
    }
]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}

export default Router
