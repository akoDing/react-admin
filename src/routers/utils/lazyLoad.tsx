import { Spin } from 'antd'
import type React from 'react'
import { Suspense } from 'react'

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
    return (
        <Suspense fallback={
            <Spin
                size='large'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >                
            </Spin>
        }>
        <Comp />    
        </Suspense>
    )
}

export default lazyLoad
