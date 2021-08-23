import React from "react";
import { useSelector } from "react-redux";

import PersonForm from "./PersonForm";
import TeamForm from "./TeamForm";
import { getSelfUserSelector } from "@redux/users/selectors";
import UrlStepperPage from "@components/UrlStepperPage";
import UserBar from "@components/UserBar";

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
  const user = useSelector(getSelfUserSelector);

  return (
    <>
      <UrlStepperPage
        steps={steps}
        title="Регистрация"
        user={user}
        lastUrl="/dashboard"
      />
      <UserBar />
    </>
  );
}
