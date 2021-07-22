import { decode } from "html-entities";
import { normalize } from "normalizr";
import { find } from "lodash";

export const parseDataSize = (size) => {
  if (/^\d+$/.test(size)) {
    return parseInt(size);
  } else {
    let [numberPart, modifierPart] = size.split(/([A-Z]+)/g);
    const parsedNumber = parseInt(numberPart);
    switch (modifierPart) {
      case "B":
        return parsedNumber;
      case "KB":
        return parsedNumber * 1024;
      case "MB":
        return parsedNumber * 1024 * 1024;
      case "GB":
        return parsedNumber * 1024 * 1024 * 1024;
      default:
        throw new Error("unexpected value " + modifierPart);
    }
  }
};

export const generateResumeFilename = ({ fullName, documentResumePath }) => {
  const fileName = fullName || "resume";
  const extension = documentResumePath
    ? documentResumePath.substring(documentResumePath.lastIndexOf("."))
    : "";
  return fileName + extension;
};

export const parseErrorMessage = (str) => {
  const dict = {
    "Email already exist": "Данный email уже занят",
    "Validation failed for object='createUserRequest'. Error count: 1":
      "Одно из полей ввода некорректно",
    "Validation failed for object='createUserRequest'. Error count: 2":
      "Одно из полей ввода некорректно",
  };

  return dict[str];
};

export const parseError = (err) => {
  switch (typeof err) {
    case "number":
      return `Произошла ошибка с кодом ${err}`;
    case "object":
      const variants = [
        parseErrorMessage(err.response?.data?.message),
        err.response?.data?.message,
        err.message,
      ];
      return find(variants, (o) => o !== undefined && o !== null);
    default:
      return err;
  }
};

export const normalizeToolkit = (data, schema) => {
  const { entities } = normalize(data, schema);
  return entities;
};
