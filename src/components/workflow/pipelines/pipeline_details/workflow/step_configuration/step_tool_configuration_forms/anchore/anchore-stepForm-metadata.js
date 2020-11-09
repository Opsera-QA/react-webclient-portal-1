const anchoreStepFormMetadata = {
  type: "Anchore Tool Configuration",
  fields: [
    {
      label: "Select Anchore Tool",
      id: "anchoreToolConfigId",
      isRequired: true
    },
    {
      label: "Anchore Tool URL",
      id: "anchoreUrl",
      isRequired: true
    },
    {
      label: "Anchore Username",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "ECR Step Push ID",
      id: "ecrPushStepId",
      isRequired: true
    }
  ],
  newModelBase: {
    anchoreToolConfigId: "",
    anchoreUrl: "",
    accountUsername: "",
    ecrPushStepId: "",
  }
};

export default anchoreStepFormMetadata;