// TODO: Remove
export const getColor = (block, value) => {
  if (value > 0) {
    switch (block) {
      case "vulnerability":
      case "bugs":
      case "code_smells":
      case "critical":
      case "blocker":
        return "danger-red";
      case "major":
        return value <= 1 ? "opsera-yellow" : "danger-red";
      case "minor":
        return value < 10 ? "opsera-yellow" : "danger-red";
      default:
        return "dark-gray-text-primary";
    }
  }
  return "dark-gray-text-primary";
};

export const getTimeDisplay = (mins) => {
  const seconds = Number(mins * 60);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const arrayToDisplay = [];
  if (days > 0) {
    arrayToDisplay.push(days + (days === 1 ? " day" : " days"));
  }
  if (hours > 0) {
    arrayToDisplay.push(hours + (hours === 1 ? " hour" : " hours"));
  }
  if (minutes > 0) {
    arrayToDisplay.push(minutes + (minutes === 1 ? " minute" : " minutes"));
  }
  if (remainingSeconds > 0) {
    arrayToDisplay.push(remainingSeconds + (remainingSeconds === 1 ? " second" : " seconds"));
  }
  const display = arrayToDisplay.join(", ");
  return display;
};

export const getShortTimestampDisplay = (mins) => {
  const seconds = Number(mins * 60);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const arrayToDisplay = [];
  if (d > 0) {
    arrayToDisplay.push(d + (d === 1 ? " day" : " days"));
  }
  if (h > 0) {
    arrayToDisplay.push(h + (h === 1 ? " hour" : " hours"));
  }
  if (m > 0) {
    arrayToDisplay.push(m + (m === 1 ? " minute" : " minutes"));
  }
  if (s > 0) {
    arrayToDisplay.push(s + (s === 1 ? " second" : " seconds"));
  }
  const display = arrayToDisplay.join(", ");
  return display;
};