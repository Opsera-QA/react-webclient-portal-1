import regexHelpers from "utils/regexHelpers";

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
    }
  ],
  newObjectFields: {
    lambdaTasks: [],
    lambdaAction: ""
  }
};

export default awsLambdaStepFormMetadata;