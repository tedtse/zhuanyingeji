export default class TodoModel {
  taskId: string;
  filepath: string;
  filename: string;
  size: number;
  date: number;

  constructor({ taskId, filepath, filename, size}: any) {
    this.taskId = taskId;
    this.filepath = filepath;
    this.filename = filename;
    this.size = size;
    this.date = Date.now();
  }
}
