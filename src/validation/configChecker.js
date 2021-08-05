import * as config from "../config";

const checkStringFunction = (name, value) => {
  if (typeof value === "undefined") {
    alert(`Config error, ${name} is undefined`);
  } else if (typeof value !== "function") {
    alert(`Config error, ${name} func is not func`);
  } else if (typeof value() !== "string") {
    alert(`Config error, ${name} return is not string`);
  }
};

const IpCheck = () => {
  checkStringFunction("Ip", config.Ip);
};

export const check = () => {
  IpCheck();
};
