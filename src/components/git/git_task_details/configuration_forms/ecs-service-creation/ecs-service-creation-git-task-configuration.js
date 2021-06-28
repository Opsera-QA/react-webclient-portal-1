import regexHelpers from "utils/regexHelpers";

const ec2ServiceCreationTaskConfigurationMetadata = {
  type: "EC2 Service Creation Configuration",
  fields: [
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true
    },
    {
      label: "Service Name",
      id: "serviceName"
    },
    {
      label: "Desired Count",
      id: "desiredCount",
      isRequired: true
    },
    {
      label: "Container Port",
      id: "containerPort",
      isRequired: true
    },
    {
      label: "Required Compatibility",
      id: "requiresCompatibilities",
      isRequired: true
    },
    {
      label: "Image URL",
      id: "imageUrl",
      isRequired: true
    },
    {
      label: "Load Balancer ARN",
      id: "loadBalancerArn",
      isRequired: true
    },
    {
      label: "Existing VPC",
      id: "vpcId",
      isRequired: true
    },
    {
      label: "AWS Tool",
      id: "awsToolId",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      clusterName: "",
      serviceName: "",
      desiredCount: "",
      containerPort: "",
      requiresCompatibilities: "",
      vpcId : "",
      imageUrl : "",
      loadBalancerArn: "",
      awsToolId: ""
    }
};

export default ec2ServiceCreationTaskConfigurationMetadata;