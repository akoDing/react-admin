export interface RouteObject {
    path?: string,
    element?: React.ReactNode,
    meta?: MetaProps,
    key?: string,
    children?: RouteObject[]
}

export interface MetaProps {
    requireAuth?: boolean,
    title: string,
    key?: string
}