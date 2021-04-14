import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function UserInfoForm() {

  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Заполните данные о себе:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            autoComplete="family-name"
            inputProps={{
              maxLength: 250,
            }}

          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Имя"
            fullWidth
            autoComplete="given-name"
            inputProps={{
              maxLength: 250,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="middleName"
            name="middleName"
            label="Отчество"
            fullWidth
            autoComplete="additional-name"
            inputProps={{
              maxLength: 250,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="university"
            name="university"
            label="Университет/Школа/Место работы"
            fullWidth
            autoComplete="off"
            inputProps={{
              maxLength: 250,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telegram"
            name="telegram"
            label="Telegram"
            fullWidth
            autoComplete="off"
            inputProps={{
              maxLength: 250,
              pattern: '@[A-Za-z0-9]*'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date"
            label="Дата рождения"
            type="date"
            defaultValue="2017-05-01"
            InputLabelProps={{
              shrink: true,
              error: false,
            }}
            onChange={(evt) => {
              setDate(evt.target.value);
              if (Date.now() < new Date(evt.target.value)){
                console.log("Invalid date")
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="О себе"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            inputProps={{
              maxLength: 250,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
          >
          Загрузить резюме
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}