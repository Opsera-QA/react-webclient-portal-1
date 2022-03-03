export const DATA_POINT_TYPES = {
  PERCENTAGE: "percentage",
  NUMBER: "number",
  LETTER_GRADE: "letter_grade",
  METRIC: "metric",
};

export const DATA_POINT_TYPE_LABELS = {
  PERCENTAGE: "Percentage",
  NUMBER: "Number",
  LETTER_GRADE: "Letter Grade",
  METRIC: "Metric",
};

export const getDataPointTypeLabel = (dataPointType) => {
  switch (dataPointType) {
    case DATA_POINT_TYPES.PERCENTAGE:
      return DATA_POINT_TYPE_LABELS.PERCENTAGE;
    case DATA_POINT_TYPES.NUMBER:
      return DATA_POINT_TYPE_LABELS.NUMBER;
    case DATA_POINT_TYPES.LETTER_GRADE:
      return DATA_POINT_TYPE_LABELS.LETTER_GRADE;
    case DATA_POINT_TYPES.METRIC:
      return DATA_POINT_TYPE_LABELS.METRIC;
    default:
      return dataPointType;
  }
};