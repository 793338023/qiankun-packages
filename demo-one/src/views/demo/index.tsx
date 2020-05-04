import React from "react";
import { Form, Input, Button, Select } from "antd";
import { FormInstance } from "antd/lib/form";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const formRef = React.createRef<FormInstance>();

  const onGenderChange = (value: any) => {
    formRef.current &&
      formRef.current.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current && formRef.current.resetFields();
  };

  const onFill = () => {
    formRef.current &&
      formRef.current.setFieldsValue({
        note: "这种222",
        gender: "哦哦哦",
      });
  };

  return (
    <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          填充
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
