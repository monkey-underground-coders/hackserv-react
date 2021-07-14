import * as yup from "yup";

export const titleSchema = yup.object().shape({
  trackName: yup.string().required().max(200),
});
