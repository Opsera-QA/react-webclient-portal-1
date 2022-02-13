
const awsLambdaFunctionTaskConfigurationMetadata = {
  type: "AWS Lambda Function Configuration",
  fields: [
    {
      label: "Function Name",
      id: "functionName",
      isRequired: true,
      regexDefinitionName: "generalText"
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
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Region",
      id: "regions",
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
      awsToolConfigId: "",
      regions: ""
    }
};

export default awsLambdaFunctionTaskConfigurationMetadata;