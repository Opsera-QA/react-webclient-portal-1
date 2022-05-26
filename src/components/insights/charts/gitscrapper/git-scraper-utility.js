export const getDurationInDaysAndHours = (hours) => {
  const hrs = Math.ceil(hours);
  const d = Math.floor(hrs/24);
  const h = Math.ceil(hrs)%24;

  return `${d}d ${h}h`;

};