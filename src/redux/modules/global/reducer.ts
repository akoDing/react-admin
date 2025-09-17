import type { GlobalState } from "@/redux/interface";
import type { Action } from "redux";
import * as types from '@/redux/mutation-types'
import { produce, type Draft } from "immer";

const globalState: GlobalState = {
    token: ''
}

interface SetTokenAction extends Action {
    type: typeof types.SET_TOKEN
    token: string
}

type ActionType = SetTokenAction

const global = (state: GlobalState = globalState, action: ActionType) => {
    return produce(state, (draftState: Draft<GlobalState>) => {
        switch (action.type) {
            case types.SET_TOKEN:
                draftState.token = action.token
                break
            default:
                break
        }
    })
}

export default global
