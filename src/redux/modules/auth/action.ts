import * as types from '@/redux/mutation-types'

// set authRouter
export const setAuthRouter = (authRouter: string[]) => {
    return {
        type: types.SET_AUTH_ROUTER,
        authRouter
    }
}

// set authButton
export const setAuthButton = (authButtons: {[propName: string]: any}) => {
    return {
        type: types.SET_AUTH_BUTTON,
        authButtons
    }
}