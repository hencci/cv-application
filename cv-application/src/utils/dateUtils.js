export function generateYears({
  start = 1980,
  end = new Date().getFullYear(),
}) {
  const years = [];
  for (let y = end; y >= start; y--) years.push(y.toString());
  return years;
}
