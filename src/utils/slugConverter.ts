export default function slugify(str: string): string {
  str = str.toLowerCase();

  // Xóa kí tự "/"
  str = str.replace("/", "-");

  // Thay thế dấu gạch ngang trước và sau khoảng trắng bằng khoảng trắng
  str = str.replace(/\s*\-\s*/g, " ");

  // Thay thế khoảng trắng bằng dấu gạch ngang
  str = str.replace(/\s+/g, "-");

  return str;
}
