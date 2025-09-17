export interface GlobalState {
    token: string
}

export interface AuthState {
    authRouter: string[],
    authButtons: {
        [propName: string]: any
    }
}
