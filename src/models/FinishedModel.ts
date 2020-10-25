export interface FinishedModelProps {
  filepath: string;
  filename: string;
  size: number;
  modifyTime: Date;
}

export default class FinishedModel {
  filepath: string;
  filename: string;
  size: number;
  modifyTime: Date;

  constructor({ filepath, filename, size, modifyTime }: FinishedModelProps) {
    this.filepath = filepath;
    this.filename = filename;
    this.size = size;
    this.modifyTime = modifyTime;
  }
}
