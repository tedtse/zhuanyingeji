import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FormItemProps } from "antd/lib/form";
import NodeJSUtils from "../libs/node-js-utils";

const Setting = NodeJSUtils.getSetting();

const labelColSpan = 4;
const wrapperColSpan = 20;
const formTitleLayout: FormItemProps = {
  labelAlign: "left",
  labelCol: { span: labelColSpan },
  wrapperCol: { span: wrapperColSpan },
};
const formItemLayout: FormItemProps = {
  labelCol: { span: labelColSpan },
  wrapperCol: { span: wrapperColSpan },
};
const formTailLayout: FormItemProps = {
  labelCol: { span: labelColSpan },
  wrapperCol: { span: wrapperColSpan, offset: 4 },
};

export default function (): JSX.Element {
  const [state, setState] = useState("read");
  const handleChangeState = (state: string) => {
    setState(state);
  };
  const handleSave = (values: any) => {
    console.log(values);
  };

  return (
    <div className="app-dlist">
      <Form initialValues={Setting} onFinish={handleSave}>
        <Form.Item {...formTitleLayout} label="科大讯飞" />
        <Form.Item
          {...formItemLayout}
          label="hostUrl"
          name={["xunfeiConf", "hostUrl"]}
          rules={[{ required: true, message: "Please input hostUrl!" }]}
        >
          <Input disabled={state === "read"} allowClear />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="appId"
          name={["xunfeiConf", "appId"]}
          rules={[{ required: true, message: "Please input appId!" }]}
        >
          <Input disabled={state === "read"} allowClear />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="secretKey"
          name={["xunfeiConf", "secretKey"]}
          rules={[{ required: true, message: "Please input secretKey!" }]}
        >
          <Input disabled={state === "read"} allowClear />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <div className="app--tar">
            {state === "read" ? (
              <Button type="primary" onClick={() => handleChangeState("write")}>
                修改
              </Button>
            ) : null}
            {state === "write" ? (
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            ) : null}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
