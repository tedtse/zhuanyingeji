import React from "react";
import { Upload } from "antd";
import { UploadProps } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
import uploadHOC from "./UploadHoc";

const UploadExt = (props: UploadProps) => (
  <Upload {...props}>
    <PlusOutlined
      style={{ color: "#bbbbbb", fontSize: "18px", cursor: "pointer" }}
    />
  </Upload>
);

export default uploadHOC(UploadExt);
