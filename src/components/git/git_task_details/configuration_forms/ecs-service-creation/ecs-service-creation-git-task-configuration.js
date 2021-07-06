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
      label: "Service Name",
      id: "ecsServiceName"
    },
    {
      label: "Desired Count",
      id: "ecsServiceDesiredCount",
      isRequired: true
    },
    {
      label: "Container Port",
      id: "ecsServiceContainerPort",
      isRequired: true
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
      ecsServiceName: "",
      ecsServiceDesiredCount: "",
      ecsServiceContainerPort: "",
      ecsServiceRequiresCompatibilities: "",
      ecsServiceVpcId : "",
      ecsServiceImageUrl : "",
      ecsServiceLoadBalancerArn: "",
      toolConfigId: "",
      ecsServiceLogGroup: "",
      ecsServiceExecutionRoleArn: "",
      ecsServiceSubnets : []
    }
};

export default ec2ServiceCreationTaskConfigurationMetadata;