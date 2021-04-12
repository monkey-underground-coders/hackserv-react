import jwtDecode from "jwt-decode";

import { setTokens } from "@redux/auth/actions";
import { load, save, remove } from "./localStorage";

export const decode = (jwtString) => {
  const decoded = jwtDecode(jwtString);
  return {
    token: jwtString,
    userId: decoded.sub,
  };
};

export const localStorageTokensSet = (store, tokensBag) => {
  const {
    accessToken,
    accessTokenExpiringAt,
    refreshToken,
    refreshTokenExpiringAt,
  } = tokensBag;

  save("accessToken.value", accessToken);
  save("accessToken.exp", accessTokenExpiringAt);
  save("refreshToken.value", refreshToken);
  save("refreshToken.exp", refreshTokenExpiringAt);

  store.dispatch(setTokens(tokensBag));
};

export const localStorageTokensLoad = () => {
  const accessToken = load("accessToken.value");
  const accessTokenExpiringAt = load("accessToken.exp");
  const refreshToken = load("refreshToken.value");
  const refreshTokenExpiringAt = load("refreshToken.exp");

  if (
    [
      accessToken,
      accessTokenExpiringAt,
      refreshToken,
      refreshTokenExpiringAt,
    ].includes(null)
  ) {
    return {};
  }

  return {
    accessToken,
    refreshToken,
    accessTokenExpiringAt,
    refreshTokenExpiringAt,
  };
};

export const localStorageTokensErase = () => {
  remove("accessToken.value");
  remove("accessToken.exp");
  remove("refreshToken.value");
  remove("refreshToken.exp");
};
