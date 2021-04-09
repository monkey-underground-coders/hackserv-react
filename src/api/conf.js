import { basicAxios } from "./utils";

export const getConfig = () => basicAxios().get("/conf");
