import lazyLoad from "../utils/lazyLoad";
import React from "react";
import LayoutIndex from "../constant";

const Home = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: '/sys/home',
                element: lazyLoad(React.lazy(() => import('@/views/home'))),
                meta: {
                    title: '首页',
                    key: '/sys/home'
                }
            }
        ]
    }
]

export default Home
