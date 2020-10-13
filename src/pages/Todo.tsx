import React from "react";
import { Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import NodeJSUtils from "../libs/node-js-utils";
import utils from "../libs/utils";

const ListItemRender = (info: any, index: number) => {
  const { filepath, filename, size, date } = info;
  return (
    <li key={index}>
      <div className="app-list__icon">
        <LoadingOutlined className="icon" />
      </div>
      <div className="app-list__content">
        <div className="app-list__content-title">
          <a
            href="#!"
            onClick={() => {
              NodeJSUtils.showItemInFolder(filepath);
            }}
          >
            {filename}
          </a>
        </div>
        <div className="app-list__content-sub">
          <span>{utils.toSize(size)}</span>
          <span>{dayjs(date).format("YYYY-MM-DD HH:mm")}</span>
        </div>
      </div>
    </li>
  );
};

const Todo = observer(({ todoList }: any) => {
  if (todoList.length) {
    return <ul className="app-list">{todoList.map(ListItemRender)}</ul>;
  } else {
    return (
      <div className="app-empty">
        <div className="app-empty__container">
          <Empty />
        </div>
      </div>
    );
  }
});

export default Todo;
