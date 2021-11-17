export const DATA_POINT_TYPES = {
  PERCENTAGE: "percentage",
  NUMBER: "number",
  LETTER_GRADE: "letter_grade",
};

export const DATA_POINT_TYPE_LABELS = {
  PERCENTAGE: "Percentage",
  NUMBER: "Number",
  LETTER_GRADE: "Letter Grade",
};

export const getTaskTypeLabel = (taskType) => {
  switch (taskType) {
    case DATA_POINT_TYPES.PERCENTAGE:
      return DATA_POINT_TYPE_LABELS.PERCENTAGE;
    case DATA_POINT_TYPES.NUMBER:
      return DATA_POINT_TYPE_LABELS.NUMBER;
    case DATA_POINT_TYPES.LETTER_GRADE:
      return DATA_POINT_TYPE_LABELS.LETTER_GRADE;
    default:
      return taskType;
  }
};