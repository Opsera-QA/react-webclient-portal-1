import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

export const ISSUE_TYPE = Object.freeze({
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
});

export const ICON_CHARACTERISTICS = Object.freeze({
  "Red": {
    icon: faArrowCircleUp,
    color: "red",
    title: "Risk",
    description: "This project's issues are trending upward"
  },
  "Green": {
    icon: faArrowCircleDown,
    color: "green",
    title: "Success",
    description: "This project's issues are trending downward"
  },
  "Neutral": {
    icon: faMinusCircle,
    color: "light-gray-text-secondary",
    title: "Same as Earlier",
    description: "Neutral: This project's issues have experienced no change"
  },
  "-": {
    icon: null,
    color: "black",
    title: "No Trend"
  }
});