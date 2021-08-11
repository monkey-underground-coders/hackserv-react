import * as yup from "yup";

export const teamCreateSchema = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required().max(200),
});

export const titleSchemaTeam = yup.object().shape({
  name: yup.string().required().max(30), 
});