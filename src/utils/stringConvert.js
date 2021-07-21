export const getFirstCapitalSymbols = (str, n = 3) =>
  str
    .split(" ")
    .map((s) => s[0].toUpperCase())
    .slice(0, n)
    .join("");
