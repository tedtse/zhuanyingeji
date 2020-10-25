import fs from "fs";
import path from "path";

declare const window: Window & { nodeJSBridge: any };

export default {
  XunfeiApi: window.nodeJSBridge.XunfeiApi || function () {},
  readFileSync(filepath: string): string {
    let result;
    try {
      result = window.nodeJSBridge.readFileSync(filepath);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  writeFileSync(filepath: string, content: string) {
    try {
      window.nodeJSBridge.writeFileSync(filepath, content);
    } catch (err) {
      console.log(err);
    }
  },
  readdirSync(filepath: string): string[] {
    let result = [];
    try {
      result = window.nodeJSBridge.readdirSync(filepath);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  statSync(filepath: string): fs.Stats {
    let result;
    try {
      result = window.nodeJSBridge.statSync(filepath);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  getPath(filepath: string): string {
    let result;
    try {
      result = window.nodeJSBridge.getPath(filepath);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  parsePath(filepath: string): path.ParsedPath | {} {
    let result = {};
    try {
      result = window.nodeJSBridge.parsePath(filepath);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  showItemInFolder(filepath: string = "") {
    try {
      window.nodeJSBridge.showItemInFolder(filepath);
    } catch (err) {
      console.log(err);
    }
  },
  getSetting(): any {
    let result;
    try {
      result = JSON.parse(window.nodeJSBridge.getSetting());
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  setSetting(setting: any) {
    try {
      window.nodeJSBridge.setSetting(setting);
    } catch (err) {
      console.log(err);
    }
  },
};
