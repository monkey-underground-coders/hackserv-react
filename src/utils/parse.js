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
