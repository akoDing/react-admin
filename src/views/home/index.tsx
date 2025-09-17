import ButtonPer from "@/components/ButtonPer"
import { Button, Modal } from "antd"
import { formConfig } from "./config"
import FormGenerator from "@/components/formGenerator"
import { useState } from "react"

const Home = () => {

  const handleFinish = (values: any) => {
    console.log('values', values)
  }

  const handleReset = () => {
    console.log('重置')
  }

  // 弹窗
  const [visible, setVisible] = useState(false)

  const handleCancel = () => {
    setVisible(false)
  }

  const handleOk = () => {
    setVisible(true)
  }

  return (
    <>
      {/* <ButtonPer btn={"add"} Comp={<Button type="primary">添加用户</Button>} />
      <ButtonPer btn={"del"} Comp={<Button type="primary">删除用户</Button>} /> */}
      <FormGenerator config={formConfig} onFinish={handleFinish} onReset={handleReset} />
      <ButtonPer btn={"add"} Comp={<Button style={{ marginTop: 10 }} type="primary" onClick={handleOk}>添加用户</Button>} />
      <Modal title="添加用户" open={visible} onCancel={handleCancel} onOk={handleOk}>
        表单
      </Modal>
    </>
  )
}

export default Home
