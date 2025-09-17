import { Result } from "antd"

const NoPermission = () => {
    return (
        <>
           <Result
            status="403"
            title="403"
            subTitle="抱歉，您没有权限访问该页面"
          />
        </>
    )
}

export default NoPermission