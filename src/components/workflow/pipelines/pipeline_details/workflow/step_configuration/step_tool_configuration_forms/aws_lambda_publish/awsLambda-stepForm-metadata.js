
const awsLambdaStepFormMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "Lambda Task Mapping",
      id: "lambdaTasks",
      isRequired: true
    },
    {
      label: "Action",
      id: "lambdaAction",
      isRequired: true
    },
    {
      label: "AWS Tool",
      id: "awsToolConfigId",
      isRequired: true,
      formText: "The selected tool must match the tool selected during Lambda task creation."
    }
  ],
  newObjectFields: {
    lambdaTasks: [],
    lambdaAction: "",
    awsToolConfigId: ""
  }
};

export default awsLambdaStepFormMetadata;