export const isAnyOf = (...matchers) => (action) =>
  matchers.some((matcher) =>
    typeof matcher === "string"
      ? matcher === action.type
      : matcher.type === action.type
  );
