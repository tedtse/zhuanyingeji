import React from "react";
import { Upload } from "antd";
import NodeJSUtils from "../libs/node-js-utils";
import { todoList, finishedList } from "../stores";
import { TodoModelProps } from "../models/TodoModel";

const Setting = NodeJSUtils.getSetting() || {};
const { xunfeiConf } = Setting;
const { outputPath, fileSuffix } = Setting.basic;

type UploadOrDragger = typeof Upload | typeof Upload.Dragger;

export default function (Wrapper: UploadOrDragger): Function {
  // const handleAction = () => {
  //   return Promise.resolve();
  // };
  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    const { path: filepath, name: filename, size } = file;
    try {
      const api = new NodeJSUtils.XunfeiApi({
        ...xunfeiConf,
        filepath,
      });
      const prepare = await api.prepareRequest();
      const taskId = prepare.data;
      if (!taskId) {
        throw new Error("非法的 taskId");
      }
      todoList.addTodo({
        taskId,
        filepath,
        filename,
        size,
      } as TodoModelProps);
      const content = await api.beginTaskRequest(taskId);
      const { name }: any = NodeJSUtils.parsePath(filepath);
      NodeJSUtils.writeFileSync(`${outputPath}/${name}.${fileSuffix}`, content);
      todoList.delTodo(taskId);
      finishedList.updateList();
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };

  return function (): JSX.Element {
    return (
      <Wrapper
        // action={handleAction}
        customRequest={handleUpload}
        showUploadList={false}
        multiple
      />
    );
  };
}
