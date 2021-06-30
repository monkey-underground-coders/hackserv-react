import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

export default function UserInfoForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Заполните данные о себе:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            name="lastName"
            label="Фамилия"
            autoComplete="family-name"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            name="firstName"
            label="Имя"
            autoComplete="given-name"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            name="middleName"
            label="Отчество"
            autoComplete="additional-name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="workPlace"
            label="Университет/Школа/Место работы"
            autoComplete="off"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            name="telegram"
            label="Telegram"
            autoComplete="off"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            name="dateOfBirth"
            label="Дата рождения"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="otherInfo"
            label="Дополнительная информация"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
