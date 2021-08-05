export const getFirstCapitalSymbols = (str, n = 3) =>
  str
    .split(" ")
    .map((s) => s[0].toUpperCase())
    .slice(0, n)
    .join("");

export const getRightBoundByChar = (str, char) => {
  const i = str.indexOf(char);
  return i > 0 ? str.slice(0, i) : "";
};

export const getFirstSymbolAsCapital = (str) =>
  str && str.length > 0 ? str.trim().toUpperCase()[0] : "";

export const capitalize = (str) => {
  const s = str.trim();
  return s ? s[0].toUpperCase() + s.slice(1) : "";
};

export const getSurnameWithInitials = ({ lastName, firstName, middleName }) =>
  `${capitalize(lastName)} ${getFirstSymbolAsCapital(firstName)}.` +
  (middleName ? getFirstSymbolAsCapital(middleName) + "." : "");
