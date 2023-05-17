export function classMerge(arr: string[]) {
  return arr.join(" ");
}

export function formatDateForQuery(date: Date | number | string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
