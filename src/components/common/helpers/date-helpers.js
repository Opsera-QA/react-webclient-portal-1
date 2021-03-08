export function convertFutureDateToDhmsFromNowString(date) {
  const currentDateInSeconds = new Date().getTime() / 1000;
  const totalSeconds = date.getTime() / 1000;
  const seconds = totalSeconds - currentDateInSeconds;

  if (seconds <= 0) {
    return "Date Already Passed";
  }

  const d = Math.floor(seconds / (3600*24));
  const h = Math.floor(seconds % (3600*24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d + (d === 1 ? " day, " : " days, ");
  const hDisplay = h + (h === 1 ? " hour, " : " hours, ");
  const mDisplay = m + (m === 1 ? " minute, " : " minutes, ");
  const sDisplay = s + (s === 1 ? " second" : " seconds");
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function getDaysUntilDate(date) {
  const currentDateInSeconds = new Date().getTime() / 1000;
  const totalSeconds = date.getTime() / 1000;
  const seconds = totalSeconds - currentDateInSeconds;

  if (seconds <= 0) {
    return -1;
  }

  return Math.floor(seconds / (3600 * 24));
}