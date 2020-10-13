export default {
  toSize(size: number): string {
    if (size < 0 || isNaN(size)) {
      throw new Error("非法的文件大小");
    }
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${Math.ceil(size / 1024)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else if (size < 1024 * 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    } else if (size < 1024 * 1024 * 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
    }
    return "";
  },
};
