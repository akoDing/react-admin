import lazyLoad from "../utils/lazyLoad";
import React from "react";
import LayoutIndex from "../constant";

const Role = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: '/sys/role',
                element: lazyLoad(React.lazy(() => import('@/views/role'))),
                meta: {
                    title: '角色管理',
                    key: '/sys/role'
                }
            }
        ]
    }
]

export default Role
