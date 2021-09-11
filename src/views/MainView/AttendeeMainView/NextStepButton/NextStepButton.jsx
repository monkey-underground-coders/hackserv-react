import React, { useCallback } from "react";
import Title from "@components/Title";
import { getSelfTeamSelector, getTeamById } from "@redux/teams";
import { getSelfUserSelector } from "@redux/users";
import { useSelector } from "react-redux";
import { steps } from "../steps";
import { Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLoading } from "@utils";
import LoadingAndError from "@components/LoadingAndError";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

const NextStepButton = ({ currentStep }) => {
  const team = useSelector(getSelfTeamSelector);
  const {
    id,
    team: teamId,
    request: requestTeamId,
  } = useSelector(getSelfUserSelector);
  const classes = useStyles();

  const actionCreator = useCallback(
    () => getTeamById({ id: teamId || requestTeamId, isInternal: false }),
    [teamId, requestTeamId]
  );

  const { bundle } = useLoading(actionCreator);

  const { label, link, color, bgcolor } = (() => {
    switch (currentStep) {
      case steps.FILLED_FORM:
        return { label: "Ожидайте принятия в команду" };
      case steps.IN_TEAM:
        if (team?.captain === id) {
          return {
            label: "Подайте заявку на хакатон",
            link: `/dashboard/team/${team.id}`,
          };
        } else {
          return { label: "Ожидание капитана команды" };
        }
      case steps.SUBMITTED:
        return { label: "Ожидайте подтверждения заявки" };
      case steps.APPROVED:
        return {
          label: "Вы одобрены! Ждём вас на хакатоне!",
          bgcolor: "success.main",
          color: "error.contrastText", // not a typo
        };
      case steps.CHECKED_IN:
        return { label: "Вы отмечены" };
      default:
        return {
          label: "Произошла ошибка",
          bgcolor: "error.main",
          color: "error.contrastText",
        };
    }
  })();

  const disabled = !link;

  const { newBgcolor, newColor } = (() => {
    if (bgcolor) {
      return { newBgcolor: bgcolor, newColor: color };
    } else if (!disabled) {
      return { newBgcolor: "primary.main", newColor: "primary.contrastText" };
    } else {
      return { newBgcolor: "text.disabled", newColor: "background.paper" };
    }
  })();

  const box = (
    <Box bgcolor={newBgcolor} color={newColor} p={2}>
      {label}
    </Box>
  );

  return (
    <LoadingAndError bundle={bundle}>
      <Title>Следующее действие</Title>
      {!disabled ? (
        <Link to={link} className={classes.link}>
          {box}
        </Link>
      ) : (
        box
      )}
    </LoadingAndError>
  );
};

export default NextStepButton;
