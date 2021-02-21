import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import VkLogo from '../../assets/vk-logo.svg';
import GoogleLogo from '../../assets/google-logo.svg';
import GitLogo from '../../assets/GitHub-logo.svg';
import { Link } from 'react-router-dom';
import { userCreate } from '../../Redux/Reducers/users';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarLogo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkdecor: {
    color: theme.palette.primary.main,
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = event => {
    event.preventDefault();
    console.log("hello click");
    dispatch(userCreate({ email, password }));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Зарегистрироваться
          </Typography>
          <Grid container spacing={4} justify={'center'}>
            <Grid item xs={6} sm={2}>
              <Link to='/oauth2/authorization/vk'>
                <Avatar src={VkLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Link to='/oauth2/authorization/google'>
                <Avatar src={GoogleLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Link to='/oauth2/authorization/github'>
                <Avatar src={GitLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
          </Grid>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={evt => setEmail(evt.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={evt => setPassword(evt.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Я согласен на подтверждение через Email адрес"
              />
              <FormControlLabel
                control={<Checkbox value="privacyPolicyAgreement" color="primary" />}
                label="Я согласен с политикой конфиденциальности и на обработку моих персональных данных"
              />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Зарегистрироваться
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/user/login" variant="body2" className={classes.linkdecor}>
                  {"Уже есть аккаунт? Войти"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}