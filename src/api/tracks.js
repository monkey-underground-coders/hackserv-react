import { mainAxios } from "./utils";

export const getAllTracks = () => mainAxios.get("/track/");
