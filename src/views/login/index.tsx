import { Button } from "antd"
import { setToken } from "@/redux/modules/global/action"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

interface LoginProps {
    setToken: typeof setToken
}

const Login = (props: LoginProps) => {
    const { setToken } = props
    const navigate = useNavigate()

    const handleLogin = () => {
        console.log('登录')
        setToken('token')
        navigate('/loading')
    }

    return (
        <>
          <Button type="primary" onClick={handleLogin}>登录</Button>
        </>
    )
}

// export default Login

// 映射dispatch
const mapDispatchToProps = { setToken }
export default connect(null, mapDispatchToProps)(Login)