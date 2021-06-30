import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

export const useMySnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueWithVariant = (variant) => (msg, params) =>
    enqueueSnackbar(msg, { ...params, variant });

  const enqueueError = enqueueWithVariant("error");

  const enqueueInfo = enqueueWithVariant("info");

  const enqueueWarning = enqueueWithVariant("warning");

  const enqueueSuccess = enqueueWithVariant("success");

  const enqueueDefault = enqueueWithVariant("default");

  return {
    enqueueDefault,
    enqueueError,
    enqueueInfo,
    enqueueSuccess,
    enqueueWarning,
    enqueueSnackbar,
  };
};

export const useGenericHandleBlurAction = (action, onFulfilled, onError) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const handleBlurAction = ({ setDisabled }) => {
    setDisabled(true);
    dispatch(action)
      .then(unwrapResult)
      .then((v) => {
        if (onFulfilled !== undefined) onFulfilled(v);
      })
      .catch((err) => {
        if (onError !== undefined) onError(err);
        else enqueueError(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return handleBlurAction;
};
