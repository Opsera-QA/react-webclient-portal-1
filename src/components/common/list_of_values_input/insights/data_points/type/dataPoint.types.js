export const DATA_POINT_TYPES = {
  PERCENTAGE: "percentage",
  NUMBER: "number",
  LETTER_GRADE: "letter_grade",
  DAYS: "days",
  HOURS: "hours",
  METRIC: "metric",
};

export const DATA_POINT_TYPE_LABELS = {
  PERCENTAGE: "Percentage",
  NUMBER: "Number",
  LETTER_GRADE: "Letter Grade",
  DAYS: "Days",
  HOURS: "Hours",
  METRIC: "Metric",
};

export const DATA_POINT_TYPE_HELP_LABELS = {
  PERCENTAGE: "Enter the value in percentage number",
  NUMBER: "Enter the value in number",
  LETTER_GRADE: "Select a Grade from the list",
  DAYS: "Enter the value in Days",
  HOURS: "Enter the value in Hours",
  METRIC: "Enter the value",
};

export const getDataPointTypeLabel = (dataPointType) => {
  switch (dataPointType) {
    case DATA_POINT_TYPES.PERCENTAGE:
      return DATA_POINT_TYPE_LABELS.PERCENTAGE;
    case DATA_POINT_TYPES.NUMBER:
      return DATA_POINT_TYPE_LABELS.NUMBER;
    case DATA_POINT_TYPES.LETTER_GRADE:
      return DATA_POINT_TYPE_LABELS.LETTER_GRADE;
    case DATA_POINT_TYPES.DAYS:
      return DATA_POINT_TYPE_LABELS.DAYS;
    case DATA_POINT_TYPES.HOURS:
      return DATA_POINT_TYPE_LABELS.HOURS;
    case DATA_POINT_TYPES.METRIC:
      return DATA_POINT_TYPE_LABELS.METRIC;
    default:
      return dataPointType;
  }
};

export const getDataPointTypeHelpText = (dataPointType) => {
  switch (dataPointType) {
    case DATA_POINT_TYPES.PERCENTAGE:
      return DATA_POINT_TYPE_HELP_LABELS.PERCENTAGE;
    case DATA_POINT_TYPES.NUMBER:
      return DATA_POINT_TYPE_HELP_LABELS.NUMBER;
    case DATA_POINT_TYPES.LETTER_GRADE:
      return DATA_POINT_TYPE_HELP_LABELS.LETTER_GRADE;
    case DATA_POINT_TYPES.DAYS:
      return DATA_POINT_TYPE_HELP_LABELS.DAYS;
    case DATA_POINT_TYPES.HOURS:
      return DATA_POINT_TYPE_HELP_LABELS.HOURS;
    case DATA_POINT_TYPES.METRIC:
      return DATA_POINT_TYPE_HELP_LABELS.METRIC;
    default:
      return dataPointType;
  }
};

export const DATA_POINT_TYPE_OPTIONS = [
  {text: DATA_POINT_TYPE_LABELS.PERCENTAGE, value: DATA_POINT_TYPES.PERCENTAGE},
  {text: DATA_POINT_TYPE_LABELS.NUMBER, value: DATA_POINT_TYPES.NUMBER},
  {text: DATA_POINT_TYPE_LABELS.DAYS, value: DATA_POINT_TYPES.DAYS},
  {text: DATA_POINT_TYPE_LABELS.HOURS, value: DATA_POINT_TYPES.HOURS},
  {text: DATA_POINT_TYPE_LABELS.LETTER_GRADE, value: DATA_POINT_TYPES.LETTER_GRADE},
];