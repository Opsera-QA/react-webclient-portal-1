import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import { format } from "date-fns";
import {parseError} from "components/common/helpers/error-helpers";

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

const formatValue = (num, minimumDecimals = 0, maximumDecimals = 2) => num.toLocaleString('en-US', {
  minimumFractionDigits: minimumDecimals,
  maximumFractionDigits: maximumDecimals,
});

export const SUPPORTED_SMART_TIME_FORMATS = {
  MONTHS: "months",
  DAYS: "days",
  HOURS: "hours",
  MINUTES: "minutes",
  SECONDS: "seconds",
};

function smartMonthsFormatter(months) {
  if (months < 1) {
    const days = months * 30;
    return smartDaysFormatter(days);
  }

  return (
    {
      amount: months,
      timeScale: "months",
      formattedString: `${formatValue(months)} Months`,
    }
  );
}

function smartDaysFormatter(days) {
  const monthsRemainder = days % 30;

  if (monthsRemainder === 0 || days >= 60) {
    const convertedMonths = days / 30;
    return smartMonthsFormatter(convertedMonths);
  }

  if (days < 2) {
    const convertedMinutes = days * 60;
    return smartMinutesFormatter(convertedMinutes);
  }

  return (
    {
      amount: days,
      timeScale: SUPPORTED_SMART_TIME_FORMATS.DAYS,
      formattedString: `${formatValue(days)} ${capitalizeFirstLetter(SUPPORTED_SMART_TIME_FORMATS.DAYS)}`,
    }
  );
}

function smartHoursFormatter(hours) {
  const daysRemainder = hours % 24;

  if (daysRemainder === 0 || hours >= 48) {
    const convertedHours = hours / 24;
    return smartDaysFormatter(convertedHours);
  }

  if (hours <= 1.5) {
    const convertedMinutes = hours * 60;
    return smartMinutesFormatter(convertedMinutes);
  }

  return (
    {
      amount: hours,
      timeScale: SUPPORTED_SMART_TIME_FORMATS.HOURS,
      formattedString: `${formatValue(hours)} ${capitalizeFirstLetter(SUPPORTED_SMART_TIME_FORMATS.HOURS)}`,
    }
  );
}

function smartMinutesFormatter(minutes) {
  const hoursRemainder = minutes % 60;

  if (hoursRemainder === 0 || minutes > 90) {
    const convertedHours = minutes / 60;
    return smartHoursFormatter(convertedHours);
  }

  if (minutes < 2) {
    const convertedSeconds = minutes * 60;
    return smartSecondsFormatter(convertedSeconds);
  }

  return (
    {
      amount: minutes,
      timeScale: SUPPORTED_SMART_TIME_FORMATS.MINUTES,
      formattedString: `${formatValue(minutes)} ${capitalizeFirstLetter(SUPPORTED_SMART_TIME_FORMATS.MINUTES)}`,
    }
  );
}

function smartSecondsFormatter (seconds) {
  const minutesRemainder = seconds % 60;

  if (minutesRemainder === 0 || seconds >= 120) {
    const convertedMinutes = seconds / 60;
    return smartMinutesFormatter(convertedMinutes);
  }

  return (
    {
      amount: seconds,
      timeScale: SUPPORTED_SMART_TIME_FORMATS.SECONDS,
      formattedString: `${formatValue(seconds)} ${capitalizeFirstLetter(SUPPORTED_SMART_TIME_FORMATS.SECONDS)}`,
    }
  );
}

export function smartTimeFormatter(value, timeFormat) {
  if (typeof value !== "number") {
    return "Unsupported Value Format. Value must be a positive number.";
  }

  if (value < 0) {
    return "Unsupported Value Format. Value must be a positive number.";
  }

  switch (timeFormat) {
    case SUPPORTED_SMART_TIME_FORMATS.SECONDS:
      return smartSecondsFormatter(value);
    case SUPPORTED_SMART_TIME_FORMATS.MINUTES:
      return smartMinutesFormatter(value);
    case SUPPORTED_SMART_TIME_FORMATS.HOURS:
      return smartHoursFormatter(value);
    case SUPPORTED_SMART_TIME_FORMATS.DAYS:
      return smartDaysFormatter(value);
    case SUPPORTED_SMART_TIME_FORMATS.MONTHS:
      return smartMonthsFormatter(value);
    default:
      return "Unsupported Time Format";
  }
}

export function formatDateWithTime(date) {
  try {
    return format(date, "yyyy-MM-dd', 'hh:mm a");
  } catch (error) {
    const parsedError = parseError(error);
    console.error(`Could not format date: ${parsedError}`);
    return date;
  }
}

export function formatDate(date) {
  try {
    return format(new Date(date), "MMM dd yyyy");
  } catch (error) {
    const parsedError = parseError(error);
    console.error(`Could not format date: ${parsedError}`);
    return date;
  }
}