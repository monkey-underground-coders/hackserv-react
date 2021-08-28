const { UserState } = require("@dictionary/user");

export const steps = Object.freeze({
  IN_TEAM: "IN_TEAM",
  ...UserState,
});

export const stepsArray = Object.freeze([
  { name: steps.REGISTERED, localized: "Зарегистрирован" },
  { name: steps.FILLED_FORM, localized: "Анкетирован" },
  { name: steps.IN_TEAM, localized: "В команде" },
  { name: steps.SUBMITTED, localized: "Отправлена заявка" },
  { name: steps.APPROVED, localized: "Одобрен к участию" },
  { name: steps.CHECKED_IN, localized: "Отмечен на входе" },
]);
