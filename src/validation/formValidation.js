import { useEffect, useState } from "react";
import _ from "lodash";

export const useInput = (initValue, ...validators) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validators);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onBlur = (evt) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const createValidator = (name, validator, errorMessage) => (props) => (
  value
) => ({
  isOk: validator(value, props || {}),
  errorMessage:
    errorMessage instanceof Function
      ? errorMessage(value, props)
      : errorMessage,
  name,
});

export const isNotEmpty = createValidator(
  "isNotEmpty",
  (value) => !!value,
  "пустое"
);

export const minLength = createValidator(
  "minLength",
  (value, min) => value.length >= min,
  (_, min) => `длина меньше чем ${min}`
);

export const isEmail = createValidator(
  "isEmail",
  (value) => /^[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value),
  "не является email'ом"
);

export const useValidation = (value, validators) => {
  const [errors, setErrors] = useState([]);
  const [validationResults, setValidationResults] = useState({});

  useEffect(() => {
    const localErrors = [];
    const localValidationResults = {};
    for (const validator of validators) {
      console.log(validator);
      const { isOk, errorMessage, name } = validator(value);
      if (!isOk) {
        localErrors.push(errorMessage);
      }
      localValidationResults[name] = isOk;
    }
    setErrors(localErrors);
    setValidationResults(localValidationResults);
  }, [value]);

  return {
    isValid: !errors.length,
    isError: !!errors.length,
    errors,
    ...validationResults,
  };
};
