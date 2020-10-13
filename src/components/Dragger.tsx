import React from "react";
import { Upload } from "antd";
import { DraggerProps } from "antd/lib/upload";
import { InboxOutlined } from "@ant-design/icons";
import uploadHOC from "./UploadHoc";

const { Dragger } = Upload;

const DraggerExt = (props: DraggerProps) => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件至此区域进行音频转换</p>
  </Dragger>
);

export default uploadHOC(DraggerExt);
