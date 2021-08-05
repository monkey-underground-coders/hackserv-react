import * as yup from "yup";

export const titleSchemaTrack = yup.object().shape({
  trackName: yup.string().required().max(200),
});
