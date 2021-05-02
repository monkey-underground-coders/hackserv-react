import { encode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { userPutData } from "@redux/users";

export const useInput = (initValue, ...validators) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validators);
  const dispatch = useDispatch();

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onBlur = (evt) => {
    setDirty(true);
  };

  const onBlurPut = (userId, userInfo) => {
    setDirty(true);
    dispatch(userPutData({ userId, userInfo }))
    .then(unwrapResult)
    .catch((err) => {
      console.log(err)
    })
  };

  return {
    value,
    onChange,
    onBlur,
    onBlurPut,
    isDirty,
    ...valid,
  };
};

export const createValidator = (name, validator, errorMessage) => {
  const validatorFunc = (value, props) => validator(value, props);

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
  "Поле пустое"
);

export const minLength = createValidator(
  "minLength",
  (value, min) => value.length >= min,
  (_, min) => `Длина меньше чем ${min}`
);

export const maxLength = createValidator(
  "maxLength",
  (value, max) => value.length <= max,
  (_, max) => `Длина больше чем ${max}`
);

export const escapedMaxLength = createValidator(
  "escapedMaxLength",
  (value, max) => encode(value).length <= (max || 250),
  "Слишком большой ввод"
);

export const isEmail = createValidator(
  "isEmail",
  (value) => /^[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value),
  "Не является email'ом"
);

export const isTelegram = createValidator(
  "isTelegram",
  (value) => /^@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/.test(value),
  "Не является Telegram id"
);

export const isDateValid = createValidator(
  "isDateValid",
  (value) => Date.now() >= new Date(value),
  "Дата указана неверно"
);

export const useValidation = (value, validators) => {
  const [errors, setErrors] = useState([]);
  const [validationResults, setValidationResults] = useState({});

  useEffect(() => {
    const localErrors = [];
    const localValidationResults = {};
    for (const validator of validators) {
      const { isOk, errorMessage, name, props } = validator;
      if (isOk === undefined || typeof name !== "string") {
        throw Error("Invalid validator " + validator);
      }
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
    defaultError: errors.length ? errors[0] : null,
    ...validationResults,
  };
};
