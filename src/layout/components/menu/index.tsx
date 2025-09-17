import { Spin, Menu, type MenuProps } from 'antd';
import Logo from './components/logo'
import logo_min from '@/assets/logo_min.png'
import { useEffect, useState } from 'react';
import React from 'react';
import * as Icons from '@ant-design/icons';
import './index.less'
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthRouter } from '@/redux/modules/auth/action';
import { connect } from "react-redux"

interface LayoutMenuProps {
    collapsed: boolean;
    setAuthRouter: (routes: string[]) => void;
}

const LayoutMenu = ({ collapsed, setAuthRouter }: LayoutMenuProps) => {

    // 菜单数据
    const [menuList, setMenuList] = useState<MeunItem[]>([])
    const [menuData , setMenuData] = useState<Menu.MenuOptions[]>([])
    // loading
    const [loading, setLoading] = useState(false)
    // 获取菜单数据
    const getMenuData = () => {
        setLoading(true)
        try{
            // api获取菜数据
            let data = [
                {
                   path: '/sys',
                   icon: 'SettingOutlined',
                   label: '菜单管理',
                   children: [
                        {
                            path: '/sys/home',
                            label: '用户管理',
                        },
                        {
                            path: '/sys/role',
                            label: '角色管理',
                        }
                   ]
                }
            ]
            console.log(deepLoopFloat(data))
            setMenuList(deepLoopFloat(data))
            setMenuData(data)
            const dynamicRouter = hanledRouter(data)
            setAuthRouter(dynamicRouter)
            setLoading(false)
        } catch(err) {
            setLoading(false)
        }
    }

    // 把菜单处理成一维数组，只保存children的路由
    const hanledRouter = (routerList: Menu.MenuOptions[], newArr: string[] = []) => {
        routerList.forEach((route: Menu.MenuOptions) => {
            if (route.children && route.children.length > 0) {
                hanledRouter(route.children, newArr)
            } else {
                newArr.push(route.path!)
            }
        })
        return newArr
    }

    useEffect(() => {
        console.log('getMenuData')
        getMenuData()
    }, [])

    // 动态渲染icon图标
    const customIcon: {[key: string]: any} = Icons
    const renderIcon = (icon: string) => {
        if (!icon) {
            return null
        } else {
            return React.createElement(customIcon[icon])
        }
    }

    const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MeunItem[] = []) => {
        menuList.forEach((item: Menu.MenuOptions) => {
            if (!item.children?.length) {
                return newArr.push(getItem(item.label, item.path, renderIcon(item.icon!)))
            }
            newArr.push(getItem(item.label, item.path, renderIcon(item.icon!), deepLoopFloat(item.children)))
        })
        return newArr
    }

    // 定义菜单类型 // Required将可选属性转换为必填属性
    type MeunItem = Required<MenuProps>['items'][number]

    const getItem = (
        label: React.ReactNode,
        key: string | undefined,
        icon?: React.ReactNode,
        children?: MeunItem[],
        type?: 'group',
    ): MeunItem => {
        return {
            label,
            key,
            icon,
            children,
            type,
        } as MeunItem
    }
    // 打开的菜单key
    const [openKeys, setOpenKeys] = useState<string[]>([])
    // 选中的菜单key
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    // 打开菜单
    const onOpenChange = (openKeys: string[]) => {
        if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
        const latestOpenKey = openKeys[openKeys.length - 1]
        if (latestOpenKey.includes(openKeys[0])) {
            setOpenKeys(openKeys)
        } else {
            setOpenKeys([latestOpenKey])
        }
    }

    const { pathname } = useLocation()
    useEffect(() => {
        console.log('-------', pathname)
        setSelectedKeys([pathname])
        // 只设置必要的openKeys，不覆盖用户手动展开的菜单
        const necessaryOpenKeys = getOpenKeys(pathname)
        // 控制菜单的展开和收起，空数组 [] 表示所有子菜单都收起
        setOpenKeys(prevOpenKeys => {
            // 合并必要的openKeys和用户已展开的菜单
            console.log('----prevOpenKeys---', prevOpenKeys)
            console.log('----necessaryOpenKeys---', necessaryOpenKeys)
            const allOpenKeys = [...new Set([...prevOpenKeys, ...necessaryOpenKeys])]
            console.log('----allOpenKeys---', allOpenKeys)
            // ['/', '//sys', '/sys']
            return allOpenKeys
        })
    }, [pathname])

    const getOpenKeys = (path: string) => {
        let newStr: string = ''
        let newArr: any[] = []
        // 分割路径并过滤空字符串
        let arr = path.split('/').filter(Boolean)
        for (let i = 0; i < arr.length; i++) {
            newStr += '/' + arr[i]
            newArr.push(newStr)
        }
        return newArr
    }

    const navigate = useNavigate()
    const clickMenu: MenuProps['onClick'] = ({key}: {key: string}) => {
        // const route = searchRoute(key, menuData)
        navigate(key)
    }

    // const searchRoute = (key: string, routes: Menu.MenuOptions[]) => {
    //     let result: Menu.MenuOptions | undefined
    //     for (let i = 0; i < routes.length; i++) {
    //         const item = routes[i]
    //         if (item.key === key) {
    //             result = item
    //         } else if (item.children) {
    //             result = searchRoute(key, item.children)
    //             if (result) {
    //                 break
    //             }
    //         }
    //     }
    // }
    
    return (
        <div className="layout-menu">
            {collapsed ? (
                <div style={{ height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={logo_min} alt="logo" style={{ height: 32, width: 32 }} />
                </div>
            ) : (
                <Logo />
            )}
            <Spin spinning={loading} tip="Loading...">
                <Menu 
                theme="dark" 
                mode="inline" 
                items={menuList}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={onOpenChange}
                onClick={clickMenu}
                 />
            </Spin>
        </div>
    )
}

// export default LayoutMenu
// 映射dispatch
const mapDispatchToProps = { setAuthRouter }
export default connect(null, mapDispatchToProps)(LayoutMenu)
