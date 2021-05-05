import * as axios from "axios";
import { Ip } from "@config";

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okOnly = (status) => status === 200;

export const basicAxios = () =>
  axios.create({
    baseURL: Ip(),
    headers: defaultBodyHeaders,
    validateStatus: okOnly,
  });

export const mainAxios = axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
});
