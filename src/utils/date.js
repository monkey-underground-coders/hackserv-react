export const secondsUntilNextHour = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return 60 * 60 - (minutes * 60 + seconds);
};
