const anchoreScanStepConfigurationMetadata = {
  type: "Anchore Scan Configuration",
  fields: [
    {
      label: "Anchore Scan Tool",
      id: "anchoreToolConfigId",
      isRequired: true
    },
    {
      label: "Anchore URL",
      id: "anchoreUrl",
      isRequired: true
    },
    {
      label: "Docker Image URL",
      id: "dockerImageUrl",
      isRequired: true
    },
    {
      label: "User Name",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "ECR Step Push ID",
      id: "ecrPushStepId",
      isRequired: true
    }
  ],
  newObjectFields: {
    anchoreToolConfigId: "",
    anchoreUrl: "",
    dockerImageUrl: "",
    accountUsername: "",
    ecrPushStepId: "",
  }
};

export default anchoreScanStepConfigurationMetadata;