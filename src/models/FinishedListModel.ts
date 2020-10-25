import dayjs from "dayjs";
import { observable, action } from "mobx";
import FinishedModel from "./FinishedModel";
import NodeJSUtils from "../libs/node-js-utils";

const ignoreFiles = [".DS_Store"];
const Setting = NodeJSUtils.getSetting();
const output = Setting.basic.outputPath;

function getFinishedList(): FinishedModel[] {
  const fileList = NodeJSUtils.readdirSync(output) || [];
  const listInfo = fileList
    .filter((filename) => !ignoreFiles.includes(filename))
    .map((filename) => {
      const stat = NodeJSUtils.statSync(`${output}/${filename}`);
      return new FinishedModel({
        filepath: NodeJSUtils.getPath(`${output}/${filename}`),
        filename,
        size: stat.size,
        modifyTime: stat.mtime,
      });
    })
    .sort((prev, next) => {
      const pmTime = dayjs(prev.modifyTime);
      const nmTime = dayjs(next.modifyTime);
      if (pmTime.isBefore(nmTime)) {
        return 1;
      } else {
        return -1;
      }
    });
  return listInfo;
}

export default class FinishedListModel {
  @observable list: FinishedModel[] = [];

  constructor() {
    this.list.push(...getFinishedList());
  }

  @action updateList() {
    this.list.splice(0, this.list.length, ...getFinishedList());
  }
}
