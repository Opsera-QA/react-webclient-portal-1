export const NOTIFICATION_METHODS = {
  EMAIL: "email",
  SLACK: "slack",
  JIRA: "jira",
  TEAMS: "teams",
  SERVICE_NOW: "servicenow",
  GCHAT: "gchat",
};

export const NOTIFICATION_METHOD_LABELS = {
  EMAIL: "Email",
  SLACK: "Slack",
  JIRA: "Jira",
  TEAMS: "Teams",
  SERVICE_NOW: "ServiceNow",
  GCHAT: "GChat",
};

export const NOTIFICATION_METHOD_SELECT_OPTIONS = [
  {
    value: NOTIFICATION_METHODS.EMAIL,
    text: NOTIFICATION_METHOD_LABELS.EMAIL
  },
  // {
  //   value: NOTIFICATION_METHODS.JIRA,
  //   text: NOTIFICATION_METHOD_LABELS.JIRA
  // },
  // {
  //   value: NOTIFICATION_METHODS.SERVICE_NOW,
  //   text: NOTIFICATION_METHOD_LABELS.SERVICE_NOW
  // },
  {
    value: NOTIFICATION_METHODS.SLACK,
    text: NOTIFICATION_METHOD_LABELS.SLACK
  },
  {
    value: NOTIFICATION_METHODS.TEAMS,
    text: NOTIFICATION_METHOD_LABELS.TEAMS
  },
  {
    value: NOTIFICATION_METHODS.GCHAT,
    text: NOTIFICATION_METHOD_LABELS.GCHAT
  },
];

export const getNotificationMethodLabel = (notificationMethod) => {
  switch (notificationMethod) {
    case NOTIFICATION_METHODS.EMAIL:
      return NOTIFICATION_METHOD_LABELS.EMAIL;
    case NOTIFICATION_METHODS.JIRA:
      return NOTIFICATION_METHOD_LABELS.JIRA;
    case NOTIFICATION_METHODS.SERVICE_NOW:
      return NOTIFICATION_METHOD_LABELS.SERVICE_NOW;
    case NOTIFICATION_METHODS.SLACK:
      return NOTIFICATION_METHOD_LABELS.SLACK;
    case NOTIFICATION_METHODS.TEAMS:
      return NOTIFICATION_METHOD_LABELS.TEAMS;
    case NOTIFICATION_METHODS.GCHAT:
      return NOTIFICATION_METHOD_LABELS.GCHAT;
    default:
      return notificationMethod;
  }
};