import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import { getSelfUserSelector } from "@redux/users";
import { UserState } from "@dictionary/user";
import {
  getSurnameWithInitials,
  getRightBoundByChar,
} from "@utils/stringConvert";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { secondsUntilNextHour } from "@utils/date";
import CenteredPaper from "@components/CenteredPaper";

const steps = Object.freeze({
  IN_TEAM: "IN_TEAM",
  ...UserState,
});

const stepsArray = Object.freeze([
  { name: steps.REGISTERED, localized: "Зарегистрирован" },
  { name: steps.FILLED_FORM, localized: "Анкетирован" },
  { name: steps.IN_TEAM, localized: "В команде" },
  { name: steps.SUBMITTED, localized: "Отправлена заявка" },
  { name: steps.APPROVED, localized: "Одобрен к участию" },
  { name: steps.CHECKED_IN, localized: "Отмечен на входе" },
]);

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
  const [greeting, setGreeting] = useState(getCurrentGreeting());

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

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {greeting}, {userName}
      </Typography>
      <CenteredPaper title="Статус">
        <Stepper activeStep={currentStep} orientation="vertical">
          {stepsArray.map(({ name, localized }) => (
            <Step key={name}>
              <StepLabel StepIconComponent={StepIcon}>{localized}</StepLabel>
              <StepContent></StepContent>
            </Step>
          ))}
        </Stepper>
      </CenteredPaper>
    </>
  );
};

export default AttendeeMainPage;
