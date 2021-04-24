import { useSnackbar } from "notistack";

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
