import * as path from "path";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import { remote } from "electron";
import XunfeiApi from "./weblfasr-node";
import { getSetting, setSetting } from "./setting-api";

declare var global: NodeJS.Global & typeof globalThis & { nodeJSBridge: any };
const { shell } = remote;

global.nodeJSBridge = {
  readFileSync(filepath: string): string {
    return fs.readFileSync(path.resolve(__dirname, "../", filepath), "utf-8");
  },
  writeFileSync(filepath: string, content: string) {
    const _filepath = path.resolve(__dirname, "../", filepath);
    mkdirp.sync(path.dirname(_filepath));
    fs.writeFileSync(_filepath, content, "utf-8");
  },
  readdirSync(filepath: string): string[] {
    const _filepath = path.resolve(__dirname, "../", filepath);
    mkdirp.sync(_filepath);
    return fs.readdirSync(_filepath, "utf-8");
  },
  statSync(filepath: string): fs.Stats {
    return fs.statSync(path.resolve(__dirname, "../", filepath));
  },
  getPath(filepath: string): string {
    return path.resolve(__dirname, "../", filepath);
  },
  parsePath(filepath: string): path.ParsedPath {
    return path.parse(filepath);
  },
  showItemInFolder(filepath: string) {
    shell.showItemInFolder(filepath);
  },
  getSetting,
  setSetting,
  XunfeiApi,
};
