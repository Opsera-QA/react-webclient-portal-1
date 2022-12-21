const dataPointVisibilityMetadata = {
  fields: [
    {
      label: "Allow User Visibility Toggle",
      id: "userVisibilityToggleSupport",
    },
    {
      label: "Show Metric",
      id: "isVisible",
    },
    {
      label: "Allow User Toggle for Default Notification",
      id: "defaultNotificationToggle",
    },
    {
      label: "Send Default Criteria Notification",
      id: "sendDefaultCriteriaNotification",
      helpTooltipText:"Notifications will trigger based on default grades by Sonarqube. When Success equals to ‘A’, Warning equals to ‘B’, ‘C’, or ‘D’ and Failure equals to ‘E’. "
    },
  ],
  newObjectFields: {
    isVisible: true,
    userVisibilityToggleSupport: false,
    defaultNotificationToggle: false,
    sendDefaultCriteriaNotification: false,
  }
};

export default dataPointVisibilityMetadata;