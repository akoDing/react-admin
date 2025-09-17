import type { AuthState } from '@/redux/interface'
import * as types from '@/redux/mutation-types'
import { produce } from 'immer'
import type { Draft } from 'immer'
import type { Action } from 'redux'


const authState: AuthState = {
    authRouter: [],
    authButtons: []
}

interface SetAuthRouterAction extends Action {
    type: typeof types.SET_AUTH_ROUTER
    authRouter: string[]
}

interface SetAuthButtonAction extends Action {
    type: typeof types.SET_AUTH_BUTTON
    authButtons: []
}


type ActionType = SetAuthRouterAction | SetAuthButtonAction

const auth = (state: AuthState = authState, action: ActionType) => {
    return produce(state, (draftState: Draft<AuthState>) => {
        switch (action.type) {
            case types.SET_AUTH_ROUTER:
                draftState.authRouter = action.authRouter
                break
            case types.SET_AUTH_BUTTON:
                draftState.authButtons = action.authButtons
                break
            default:
                break
        }
    })
}

export default auth