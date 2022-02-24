export const NOTIFICATION_TYPES = {
  PIPELINE: "pipeline",
  METRIC: "metric",
};

export const NOTIFICATION_TYPE_LABELS = {
  PIPELINE: "Pipeline",
  METRIC: "Metric",
};

export const NOTIFICATION_TYPE_SELECT_OPTIONS = [
  // {
  //   value: NOTIFICATION_TYPES.METRIC,
  //   text: NOTIFICATION_TYPES_LABELS.METRIC
  // },
  {
    value: NOTIFICATION_TYPES.PIPELINE,
    text: NOTIFICATION_TYPE_LABELS.PIPELINE
  },
];

export const getNotificationTypeLabel = (notificationType) => {
  switch (notificationType) {
    case NOTIFICATION_TYPES.PIPELINE:
      return NOTIFICATION_TYPE_LABELS.PIPELINE;
    case NOTIFICATION_TYPES.METRIC:
      return NOTIFICATION_TYPE_LABELS.METRIC;
    default:
      return notificationType;
  }
};