import React from "react";
import { Empty } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import NodeJSUtils from "../libs/node-js-utils";
import utils from "../libs/utils";

function ListItemRender(info: any, index: number): JSX.Element {
  const { filepath, filename, size, modifyTime } = info;
  return (
    <li key={index}>
      <div className="app-list__icon">
        <AudioOutlined className="icon" />
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
          <span>{dayjs(modifyTime).format("YYYY-MM-DD HH:mm")}</span>
        </div>
      </div>
    </li>
  );
}

const Finished = observer(({ finishedList }: any) => {
  if (finishedList.length) {
    return <ul className="app-list">{finishedList.map(ListItemRender)}</ul>;
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

export default Finished;
