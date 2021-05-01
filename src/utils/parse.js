import { decode } from "html-entities";
import { normalize } from "normalizr";

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

export const parseErrors = (str) => {
  const dict = {
    "Email already exist": "Данный email уже занят",
    "Validation failed for object='createUserRequest'. Error count: 1":
      "Одно из полей ввода некорректно",
    "Validation failed for object='createUserRequest'. Error count: 2":
      "Одно из полей ввода некорректно",
  };

  return dict[str] || str;
};

export const decodeEscapedEntity = (value, deep = false) => {
  const processEntity = (v) => {
    if (Array.isArray(v)) {
      return decodeEscapedEntity(v);
    }
    if (typeof v === "object") {
      return deep ? decodeEscapedEntity(v) : v;
    }
    if (typeof v === "string") {
      return decode(v);
    }
    return v;
  };

  if (Array.isArray(value)) {
    return value.map(processEntity);
  } else {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, processEntity(v)])
    );
  }
};

export const normalizeToolkit = (data, schema) => {
  const { entities } = normalize(data, schema);
  return entities;
};

export const normalizeToolkitDecode = (data, schema, deep = true) => {
  return normalizeToolkit(decodeEscapedEntity(data, deep), schema);
};
