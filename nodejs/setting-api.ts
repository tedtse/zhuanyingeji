import * as fs from "fs";

export function getSetting(): any {
  const Setting = fs.readFileSync(__dirname + "/setting.json", "utf8");
  return Setting;
}

export function setSetting(setting: any) {
  const Setting = fs.readFileSync(__dirname + "/setting.json", "utf8");
  const _Setting = Object.assign({}, Setting, setting);
  fs.writeFileSync(
    __dirname + "setting.json",
    JSON.stringify(_Setting, null, 2),
    "utf8"
  );
}
