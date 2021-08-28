import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import clsx from "clsx";

import { getSelfUserSelector } from "@redux/users";
import { UserState } from "@dictionary/user";
import {
  getSurnameWithInitials,
  getRightBoundByChar,
} from "@utils/stringConvert";
import { secondsUntilNextHour } from "@utils/date";
import Title from "@components/Title";
import { steps, stepsArray } from "./steps";
import NextStepButton from "./NextStepButton";
import VkWidget from "./VkWidget";

const useMainStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    "& + *": {
      marginTop: theme.spacing(3),
    },
  },
  // column: {
  //   "& > *": {
  //     height: "100%",
  //   },
  // },
  // secondColumn: {
  //   display: "flex",
  //   alignItems: "stretch",
  // },
  // newsBlockLargeScreen: {
  //   flexGrow: 1,
  // },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto 1fr",
    gridTemplateAreas: `
      "title title"
      "stepper nextStepButton"
      "stepper newsBlock"
    `,
    width: "100%",
    height: "100%",
    gap: theme.spacing(3),
  },
  title: {
    gridArea: "title",
  },
  stepper: {
    gridArea: "stepper",
    "& > *": {
      height: "100%",
    },
  },
  nextStepButton: {
    gridArea: "nextStepButton",
  },
  newsBlock: {
    gridArea: "newsBlock",
    "& > *": {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    "& > * > div": {
      flexGrow: 2,
    },
  },
}));

const getCurrentGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 7 || hour >= 22) {
    return "Доброй ночи";
  } else if (hour < 12) {
    return "Доброе утро";
  } else if (hour < 16) {
    return "Добрый день";
  } else {
    return "Добрый вечер";
  }
};

const StepIcon = ({ active, completed }) =>
  active || completed ? (
    <CheckCircleIcon color="primary" />
  ) : (
    <RadioButtonUncheckedIcon color="primary" />
  );

const AttendeeMainPage = () => {
  const classes = useMainStyles();
  const [greeting, setGreeting] = useState(getCurrentGreeting());

  const theme = useTheme();
  const largeScreen = useMediaQuery(
    theme.breakpoints.up(600 + theme.spacing(4) * 2)
  );

  const { userState, email, firstName, middleName, lastName, team, request } =
    useSelector(getSelfUserSelector);

  const currentStateStep = (() => {
    if (
      userState === UserState.FILLED_FORM &&
      team === null &&
      request !== null
    ) {
      return steps.REQUESTED_IN_TEAM;
    } else if (userState === UserState.FILLED_FORM) {
      return steps.IN_TEAM;
    } else {
      return steps[userState];
    }
  })();

  const currentStep = stepsArray.map((s) => s.name).indexOf(currentStateStep);

  const userName = useMemo(
    () =>
      !lastName
        ? getRightBoundByChar(email, "@")
        : getSurnameWithInitials({ lastName, firstName, middleName }),
    [lastName, firstName, middleName, email]
  );

  useEffect(() => {
    const timer = setTimeout(
      () => setGreeting(getCurrentGreeting()),
      secondsUntilNextHour() * 1000
    );

    return () => clearTimeout(timer);
  });

  const stepper = (
    <Paper className={classes.paper}>
      <Title>Статус</Title>
      <Stepper activeStep={currentStep} orientation="vertical">
        {stepsArray.map(({ name, localized }) => (
          <Step key={name}>
            <StepLabel StepIconComponent={StepIcon}>{localized}</StepLabel>
            <StepContent></StepContent>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );

  const nextStepButton = (
    <Paper className={classes.paper}>
      <NextStepButton currentStep={currentStateStep} />
    </Paper>
  );

  const greetingTypography = (
    <Typography variant="h4" gutterBottom>
      {greeting}, {userName}
    </Typography>
  );

  const vkWidget = (
    <Paper
      className={clsx(
        classes.paper,
        largeScreen && classes.newsBlockLargeScreen
      )}
    >
      <Title>Новости</Title>
      <VkWidget />
    </Paper>
  );

  return (
    <Container maxWidth="lg" className={classes.container}>
      {largeScreen ? (
        <div className={classes.gridContainer}>
          <div className={classes.title}>{greetingTypography}</div>
          <div className={classes.stepper}>{stepper}</div>
          <div className={classes.nextStepButton}>{nextStepButton}</div>
          <div className={classes.newsBlock}>{vkWidget}</div>
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item sm={12}>
            {greetingTypography}
          </Grid>
          <Grid item xs={12}>
            {stepper}
          </Grid>
          <Grid item xs={12}>
            {nextStepButton}
          </Grid>
          <Grid item xs={12}>
            {vkWidget}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AttendeeMainPage;
