import { useEffect, useState } from "react";

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

export const createValidator = (name, validator, errorMessage) => {
  const validatorFunc = (value, props) => validator(value, props || {});

  const errorMessageFunc = (value, props) =>
    errorMessage instanceof Function
      ? errorMessage(value, props)
      : errorMessage;

  return (props) => ({
    isOk: validatorFunc,
    errorMessage: errorMessageFunc,
    name,
    props,
  });
};

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
    console.log(validators);
    for (const validator of validators) {
      const { isOk, errorMessage, name, props } = validator;
      const result = isOk(value, props);
      if (!result) {
        localErrors.push(errorMessage(value, props));
      }
      localValidationResults[name] = result;
    }
    setErrors(localErrors);
    setValidationResults(localValidationResults);
  }, [value, JSON.stringify(validators)]);

  return {
    isValid: !errors.length,
    isError: !!errors.length,
    errors,
    ...validationResults,
  };
};
