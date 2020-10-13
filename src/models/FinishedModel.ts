export default class FinishedModel {
  filepath: string;
  filename: string;
  size: number;
  modifyTime: number;

  constructor({ filepath, filename, size, modifyTime }: any) {
    this.filepath = filepath;
    this.filename = filename;
    this.size = size;
    this.modifyTime = modifyTime;
  }
}
