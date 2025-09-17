import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.less'
import LayoutMenu from './components/menu';
import { store } from '@/redux';
import { setAuthButton } from '@/redux/modules/auth/action';
import { connect } from "react-redux"

const layoutIndex = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);

    // const userToken = store.getState().global.token
    // if (!userToken) {
    //     return <Navigate to="/login" />
    // }

    const { setAuthButton } = props
    const getAuthButtonsList = async () => {
        let data = {
            '/sys/home': ['add'] 
        }
        setAuthButton(data)
    }

    useEffect(() => {
        getAuthButtonsList()
    }, [])

    return (
        <>
            <div className="container">
                <Sider 
                    collapsible 
                    width={220} 
                    theme='dark'
                    collapsed={collapsed}
                    onCollapse={(value) => {
                        setCollapsed(value)
                    }}
                >
                    <LayoutMenu collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Layout.Header>
                        Header
                    </Layout.Header>
                    <Layout.Content>
                        <Outlet />
                    </Layout.Content>
                    <Layout.Footer>
                        Footer
                    </Layout.Footer>
                </Layout>
            </div>
        </>
    )
}

// export default layoutIndex
// 映射dispatch
const mapDispatchToProps = { setAuthButton }
export default connect(null, mapDispatchToProps)(layoutIndex)
