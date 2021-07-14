import regexHelpers from "utils/regexHelpers";

const awsLambdaFunctionTaskConfigurationMetadata = {
  type: "AWS Lambda Function Configuration",
  fields: [
    {
      label: "Function Name",
      id: "functionName",
      isRequired: true
    },
    {
      label: "IAM Role",
      id: "role",
      isRequired: true,
    },
    {
      label: "Runtime",
      id: "runtime",
      isRequired: true
    },
    {
      label: "Handler",
      id: "handler",
      isRequired: true
    },
    {
      label: "Function ARN",
      id: "functionArn",
      isRequired: true
    },
    {
      label: "AWS Tool",
      id: "toolId",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      functionName: "",
      role: "",
      runtime: "",
      handler : "",
      functionArn: "",
      toolId: ""
    }
};

export default awsLambdaFunctionTaskConfigurationMetadata;