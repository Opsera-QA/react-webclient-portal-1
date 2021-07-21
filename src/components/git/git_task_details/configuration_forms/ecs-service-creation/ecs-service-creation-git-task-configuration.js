import regexHelpers from "utils/regexHelpers";

const ec2ServiceCreationTaskConfigurationMetadata = {
  type: "EC2 Service Creation Configuration",
  fields: [
    {
      label: "Cluster Name",
      id: "ecsClusterName",
      isRequired: true
    },
    {
      label: "Desired Count",
      id: "ecsServiceDesiredCount",
      isRequired: true,
      regexValidator: regexHelpers.regexTypes.numericalField
    },
    {
      label: "Required Compatibility",
      id: "ecsServiceRequiresCompatibilities",
      isRequired: true
    },
    {
      label: "Load Balancer ARN",
      id: "ecsServiceLoadBalancerArn",
      isRequired: true
    },
    {
      label: "Existing VPC",
      id: "ecsServiceVpcId",
      isRequired: true
    },
    {
      label: "AWS Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Service Log Group",
      id: "ecsServiceLogGroup",
      maxLength: 32,
      regexValidator: /^[A-Za-z0-9-.:]*$/,
    },
    {
      label: "Execution Role ARN",
      id: "ecsServiceExecutionRoleArn",
    },
    {
      label: "Subnets",
      id: "ecsServiceSubnets",
    },
  ],
  newObjectFields:
    {
      ecsClusterName: "",
      ecsServiceDesiredCount: "",
      ecsServiceRequiresCompatibilities: "",
      ecsServiceVpcId : "",
      ecsServiceLoadBalancerArn: "",
      toolConfigId: "",
      ecsServiceLogGroup: "",
      ecsServiceExecutionRoleArn: "",
      ecsServiceSubnets : []
    }
};

export default ec2ServiceCreationTaskConfigurationMetadata;