import React from "react";
import { useSelector } from "react-redux";

import PersonForm from "./PersonForm";
import TeamForm from "./TeamForm";
import { userIdSelector } from "@redux/auth";
import { getUserByIdSelector } from "@redux/users/selectors";
import { DefaultStepperPage } from "@components/StepperPage";

const steps = [
  {
    label: "Данные о себе",
    component: PersonForm,
  },
  {
    label: "Команды",
    component: TeamForm,
  },
];

export default function AttendeeForm() {
  const userId = useSelector(userIdSelector);

  const user = useSelector((state) => getUserByIdSelector(state, { userId }));

  return (
    <DefaultStepperPage
      steps={steps}
      title="Регистрация"
      endingTitle="Регистрация прошла успешно"
      endingText="Ожидайте подтверждения от организатора"
      user={user}
    />
  );
}
