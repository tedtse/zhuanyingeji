/* Created by iflytek on 2020/03/01.
 *
 * 运行前：请先填写 appId、secretKey、filepath
 *
 * 语音转写 WebAPI 接口调用示例
 * 此demo只是一个简单的调用示例，不适合用到实际生产环境中
 *
 * 语音转写 WebAPI 接口调用示例 接口文档（必看）：https://www.xfyun.cn/doc/asr/lfasr/API.html
 * 错误码链接：
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 *
 */
import * as fs from "fs";
import { ReadStream } from "fs";
import * as path from "path";
const CryptoJS = require("crypto-js");
const rp = require("request-promise");

const log = console;
// 请求的接口名
const api = {
  prepare: "prepare",
  upload: "upload",
  merge: "merge",
  getProgress: "getProgress",
  getResult: "getResult",
};

// 文件分片大小 10M
const FILE_PIECE_SICE = 10485760;

// ——————————————————转写可配置参数————————————————
// 参数可在官网界面（https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E8%BD%AC%E5%86%99.html）查看，根据需求可自行在gene_params方法里添加修改
// 转写类型
// let lfasr_type = 0;
// 是否开启分词
// let has_participle = "false";
// let has_seperate = "true";
// 多候选词个数
// let max_alternatives = 0;

// slice_id 生成器
class SliceIdGenerator {
  private __ch: string;

  constructor() {
    this.__ch = "aaaaaaaaa`";
  }

  getNextSliceId() {
    let ch = this.__ch;
    let i = ch.length - 1;
    while (i >= 0) {
      let ci = ch[i];
      if (ci !== "z") {
        ch =
          ch.slice(0, i) +
          String.fromCharCode(ci.charCodeAt(0) + 1) +
          ch.slice(i + 1);
        break;
      } else {
        ch = ch.slice(0, i) + "a" + ch.slice(i + 1);
        i--;
      }
    }
    this.__ch = ch;
    return this.__ch;
  }
}

export default class XunfeiApi {
  private appId: string;
  private secretKey: string;
  private hostUrl: string;
  private filepath: string;
  private fileLen: number;
  private fileName: string;

  constructor({ appId, secretKey, hostUrl, filepath }: any) {
    this.appId = appId;
    this.secretKey = secretKey;
    this.hostUrl = hostUrl;
    this.filepath = filepath;
    this.fileLen = fs.statSync(this.filepath).size;
    this.fileName = path.basename(this.filepath);
  }

  // 鉴权签名
  getSigna(ts: number): string {
    const md5 = CryptoJS.MD5(this.appId + ts).toString();
    const sha1 = CryptoJS.HmacSHA1(md5, this.secretKey);
    const signa = CryptoJS.enc.Base64.stringify(sha1);
    return signa;
  }

  geneParams(apiName: string, taskId?: string, sliceId?: string): any {
    // 获取当前时间戳
    const ts = Math.ceil(new Date().getTime() / 1000);
    const { appId, fileLen, fileName } = this,
      signa = this.getSigna(ts),
      paramDict: any = {
        app_id: appId,
        signa,
        ts,
      };

    // eslint-disable-next-line
    switch (apiName) {
      case api.prepare:
        let sliceNum = Math.ceil(fileLen / FILE_PIECE_SICE);
        paramDict.file_len = fileLen;
        paramDict.file_name = fileName;
        paramDict.slice_num = sliceNum;
        break;
      case api.upload:
        paramDict.task_id = taskId;
        paramDict.slice_id = sliceId;
        break;
      case api.merge:
        paramDict.task_id = taskId;
        paramDict.file_name = fileName;
        break;
      case api.getProgress:
      case api.getResult:
        paramDict.task_id = taskId;
    }
    return paramDict;
  }

  async geneRequest(
    apiName: string,
    data: any,
    file?: File | ReadStream
  ): Promise<any> {
    let options;
    if (file) {
      options = {
        method: "POST",
        uri: this.hostUrl + apiName,
        formData: {
          ...data,
          content: file,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      options = {
        method: "POST",
        uri: this.hostUrl + apiName,
        form: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      };
    }

    try {
      let res = await rp(options);
      res = JSON.parse(res);

      if (res.ok === 0) {
        log.info(apiName + " success " + JSON.stringify(res));
      } else {
        log.error(apiName + " error " + JSON.stringify(res));
      }

      return res;
    } catch (err) {
      log.error(apiName + " error" + err);
    }
  }

  prepareRequest(): Promise<any> {
    return this.geneRequest(api.prepare, this.geneParams(api.prepare));
  }

  uploadRequest(
    taskId: string,
    filepath: string,
    fileLen: number
  ): Promise<any> {
    let self = this;

    return new Promise((resolve, reject) => {
      let index = 1,
        start = 0,
        sig = new SliceIdGenerator();

      async function loopUpload() {
        let len = fileLen < FILE_PIECE_SICE ? fileLen : FILE_PIECE_SICE,
          end = start + len - 1;

        // fs.createReadStream() 读取字节时，start 和 end 都包含在内
        let fileFragment = fs.createReadStream(filepath, {
          start,
          end,
        });

        let res = await self.geneRequest(
          api.upload,
          self.geneParams(api.upload, taskId, sig.getNextSliceId()),
          fileFragment
        );

        if (res.ok === 0) {
          log.info("upload slice " + index + " success");
          index++;
          start = end + 1;
          fileLen -= len;

          if (fileLen > 0) {
            loopUpload();
          } else {
            resolve();
          }
        }
      }

      loopUpload();
    });
  }

  mergeRequest(taskId: string): Promise<any> {
    return this.geneRequest(api.merge, this.geneParams(api.merge, taskId));
  }

  getProgressRequest(taskId: string): Promise<any> {
    let self = this;

    return new Promise((resolve, reject) => {
      function sleep(time: number) {
        return new Promise((resolve) => {
          setTimeout(resolve, time);
        });
      }

      async function loopGetProgress() {
        let res = await self.geneRequest(
          api.getProgress,
          self.geneParams(api.getProgress, taskId)
        );

        let data = JSON.parse(res.data);
        let taskStatus = data.status;
        log.info(
          "task " + taskId + " is in processing, task status " + taskStatus
        );
        if (taskStatus === 9) {
          log.info("task " + taskId + " finished");
          resolve();
        } else {
          sleep(20000).then(() => loopGetProgress());
        }
      }

      loopGetProgress();
    });
  }

  async getResultRequest(taskId: string): Promise<any> {
    let res = await this.geneRequest(
      api.getResult,
      this.geneParams(api.getResult, taskId)
    );

    let data = JSON.parse(res.data),
      result = "";
    data.forEach((val: any) => {
      result += val.onebest;
    });
    log.info(result);
    return result;
  }

  async allApiRequest(): Promise<any> {
    let prepare = await this.prepareRequest();
    let taskId = prepare.data;
    await this.uploadRequest(taskId, this.filepath, this.fileLen);
    await this.mergeRequest(taskId);
    await this.getProgressRequest(taskId);
    return await this.getResultRequest(taskId);
  }

  async beginTaskRequest(taskId: string): Promise<any> {
    await this.uploadRequest(taskId, this.filepath, this.fileLen);
    await this.mergeRequest(taskId);
    await this.getProgressRequest(taskId);
    return await this.getResultRequest(taskId);
  }
}
