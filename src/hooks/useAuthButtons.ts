import { store } from "@/redux"
import { routerArray } from "@/routers"
import { searchRoute } from "@/utile"
import { useLocation } from "react-router-dom"

const useAuthButtons = () => {
    const { pathname } = useLocation()
    const route = searchRoute(pathname, routerArray)

    console.log('匹配出的路由，按钮权限', route)

    return {
        BUTTONS: store.getState().auth.authButtons[route.meta!.key!] || {}
    }
}

export default useAuthButtons