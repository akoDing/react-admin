import { Button, Form, Input, Row, Col, Select } from "antd";
import './index.less'

interface FormGeneratorProps {
    config: FormConfigItem[],
    onFinish?: (values: any) => void;
    onReset?: () => void;
    values?: any;
    confirmText?: string;
    resetText?: string;
}

const SearchForm: React.FC<FormGeneratorProps> = ({
    config,
    onFinish,
    onReset,
    values,
    confirmText = "查询",
    resetText = "重置",
}) => {
    console.log('config', config)
    const renderFormItem = (item: FormConfigItem) => {
        switch (item.type) {
            case 'input':
                return <Input style={{ textAlign: 'left' }} placeholder={item.placeholder} />
            case 'select':
                return <Select style={{ width: 180, textAlign: 'left' }} allowClear placeholder={item.placeholder} >
                    {
                        item.options?.map((option) => (
                            <Select.Option key={option.value} value={option.value} style={{ textAlign: 'left' }}>{option.label}</Select.Option>
                        ))
                    }
                </Select>
            default:
                return null;
        }
    }

    return (
        <Form layout="inline" className="layout_form" onFinish={onFinish} onReset={onReset}>
            {
                config.map((item) => (
                    <Form.Item key={item.name} name={item.name} label={item.label}>
                        {
                            renderFormItem(item)
                        }
                    </Form.Item>
                ))
            }
            <div className="btnBox">
                <Button type="primary" htmlType="submit">{confirmText}</Button>
                <Button htmlType="reset">{resetText}</Button>
            </div>
        </Form>
    )
}

export default SearchForm