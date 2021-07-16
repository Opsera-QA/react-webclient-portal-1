import regexHelpers from "utils/regexHelpers";

const awsLambdaStepFormMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "Lambda Task Mapping",
      id: "lambdaTasks",
      isRequired: true
    }
  ],
  newObjectFields: {
    lambdaTasks: [],
  }
};

export default awsLambdaStepFormMetadata;