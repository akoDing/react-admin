import { store } from "@/redux"
import { Navigate, useNavigate } from "react-router-dom"

const Loading = () => {
    const navigate = useNavigate()
    const  { authRouter } = store.getState().auth
    console.log('authRouter', authRouter)
    return (
        <>
          {authRouter && authRouter.length > 0 ? <Navigate to={authRouter[0]} /> : <h1>Loading</h1>}
        </>
    )
}

export default Loading
