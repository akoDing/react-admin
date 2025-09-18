import ButtonPer from "@/components/ButtonPer"
import { Button, Modal } from "antd"
import { formConfig } from "./config"
import FormGenerator from "@/components/formGenerator"
import { useState } from "react"
import userApi from "@/api/user"
import EChartsComponent from '@/components/echartsCom';
import type { EChartsOption } from 'echarts';

const Home = () => {

  // 定义图表配置项，添加类型注解
  const chartOption: EChartsOption = {
    title: {
      // text: '示例图表',
      // left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      top: 5
    },
    grid: {
      top: 50, // 图表距离顶部的距离
      left: 20, // 图表距离左侧的距离
      right: 20, // 图表距离右侧的距离
      bottom: 5 // 图表距离底部的距离
    },
    series: [
      {
        name: '数据类别',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 1048, name: '类别1' },
          { value: 735, name: '类别2' },
          { value: 580, name: '类别3' },
          { value: 484, name: '类别4' },
          { value: 300, name: '类别5' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 图表初始化完成后的回调
  const handleChartInitialized = (instance: echarts.ECharts) => {
    console.log('ECharts 实例初始化完成', instance);
    // 可以在这里进行额外的图表操作
  };

  const handleFinish = (values: any) => {
    console.log('values', values)
    userApi.getUserList({ key: 1 }).then(res => {
      console.log('res', res)
    })
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
      <div>
        <EChartsComponent
          option={chartOption}
          style={{ width: '400px', height: '400px', backgroundColor: '#ffffff', borderRadius: '8px', marginTop: '12px'}}
          onInitialized={handleChartInitialized}
          responsive={true}
        />
      </div>
    </>
  )
}

export default Home
