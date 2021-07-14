import regexHelpers from "utils/regexHelpers";

const awsLambdaStepFormMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "S3 Push Step",
      id: "s3StepId",
      isRequired: true,
    },
    {
      label: "Service Task",
      id: "lambdaTasks",
      isRequired: true
    },
  ],
  newObjectFields: {
    s3StepId: "",
    lambdaTasks: []
  }
};

export default awsLambdaStepFormMetadata;