export const NOTIFICATION_TYPES = {
  AUDIT_LOG: "audit_log",
  PIPELINE: "pipeline",
  METRIC: "metric",
};

export const NOTIFICATION_TYPE_LABELS = {
  AUDIT_LOG: "Audit Log",
  PIPELINE: "Pipeline",
  METRIC: "Metric",
};

export const NOTIFICATION_TYPE_SELECT_OPTIONS = [
  {
    value: NOTIFICATION_TYPES.METRIC,
    text: NOTIFICATION_TYPE_LABELS.METRIC
  },
  {
    value: NOTIFICATION_TYPES.AUDIT_LOG,
    text: NOTIFICATION_TYPE_LABELS.AUDIT_LOG
  },
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
    case NOTIFICATION_TYPES.AUDIT_LOG:
      return NOTIFICATION_TYPE_LABELS.AUDIT_LOG;
    default:
      return notificationType;
  }
};