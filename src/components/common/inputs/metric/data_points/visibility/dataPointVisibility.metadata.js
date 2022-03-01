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
  ],
  newObjectFields: {
    isVisible: true,
    userVisibilityToggleSupport: false,
  }
};

export default dataPointVisibilityMetadata;