import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/pro-solid-svg-icons";

const getIconColor = (severity) => {
  switch (severity) {
    case "up":
      return "red";
    case "down":
      return "green";
    case "neutral":
      return "light-gray-text-secondary";
    case "black":
      return "black";
    default:
      break;
  }
};

const getIcon = (severity) => {
  switch (severity) {
    case "up":
      return faArrowCircleUp;
    case "down":
      return faArrowCircleDown;
    case "neutral":
      return faMinusCircle;
    default:
      break;
  }
};

const getDescription = (severity) => {
  switch (severity) {
    case "up":
      return "This parameter is trending upward";
    case "down":
      return "This parameter is trending downward";
    case "neutral":
      return "Neutral: This parameter experienced no change";
    case "black":
      return "No Trend";
  }
};

const getTimeDisplay = (miliSeconds) => {
  const seconds = Number(miliSeconds / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const arrayToDisplay = [];
  if (days > 0) {
    arrayToDisplay.push(days + (days === 1 ? " day" : " days"));
  }
  if (hours > 0) {
    arrayToDisplay.push(hours + (hours === 1 ? " hr" : " hrs"));
  }
  if (minutes > 0) {
    arrayToDisplay.push(minutes + (minutes === 1 ? " min" : " min"));
  }
  if (remainingSeconds > 0) {
    arrayToDisplay.push(remainingSeconds + (remainingSeconds === 1 ? " sec" : " sec"));
  }
  if (arrayToDisplay.length === 0) {
    return "0 sec";
  }
  const display = arrayToDisplay.slice(0, 2).join(", ");
  return display;
};

export { getIconColor, getIcon, getDescription, getTimeDisplay };
