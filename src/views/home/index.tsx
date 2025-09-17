import ButtonPer from "@/components/ButtonPer"
import { Button } from "antd"
import { formConfig } from "./config"
import FormGenerator from "@/components/formGenerator"
const Home = () => {

  const handleFinish = (values: any) => {
    console.log('values', values)
  }



  return (
    <>
      {/* <ButtonPer btn={"add"} Comp={<Button type="primary">添加用户</Button>} />
      <ButtonPer btn={"del"} Comp={<Button type="primary">删除用户</Button>} /> */}
      <FormGenerator config={formConfig} onFinish={handleFinish} />
    </>
  )
}

export default Home
