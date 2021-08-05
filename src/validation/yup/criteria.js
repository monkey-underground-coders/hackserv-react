import * as yup from "yup";

export const basicCriteriaInfo = yup.object().shape({
  name: yup.string().required().max(200),
  maxValue: yup.number().required().positive(),
});

export const criteriaSchema = basicCriteriaInfo.shape({
  description: yup.string(),
});
