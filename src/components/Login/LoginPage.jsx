import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import LoginWidget from './LoginWidget';
import { makePage } from '@components/ImageWidgetPage';
import { refreshValidSelector, refreshTokenSelector, accessValidSelector } from '@redux/auth/selectors';
import { updateAccessToken } from '@redux/auth/slices';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const isRefreshTokenPresented = useSelector(refreshValidSelector);
  const refreshToken = useSelector(refreshTokenSelector);
  const isAccessTokenPresented = useSelector(accessValidSelector);

  const isRefreshMustProceed = isRefreshTokenPresented && !isAccessTokenPresented;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isRefreshMustProceed)
      dispatch(updateAccessToken({refreshToken}));
  });
  
  return (
    <>
      {makePage(LoginWidget)}
      <Backdrop className={classes.backdrop} open={isRefreshMustProceed}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};