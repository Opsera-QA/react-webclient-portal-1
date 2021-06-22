import regexHelpers from "utils/regexHelpers";

const ec2ClusterCreationTaskConfigurationMetadata = {
  type: "EC2 Cluster Creation Configuration",
  fields: [
    {
      label: "CIDR Block",
      id: "vpcCidrBlock"
    },
    {
      label: "Cluster Template",
      id: "clusterTemplate"
    },
    {
      label: "Create VPC?",
      id: "createVpc",
    },
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Public Subnets",
      id: "publicSubnets",
    },
    {
      label: "Image Type",
      id: "imageType",
    },
    {
      label: "Private Subnets",
      id: "privateSubnets",
    },
    {
      label: "Subnet 1",
      id: "subnet_1",
    },
    {
      label: "Subnet 2",
      id: "subnet_2",
    },
    {
      label: "Subnet 3",
      id: "subnet_3",
    },
    {
      label: "AWS Tool",
      id: "awsToolId",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      vpcCidrBlock: "10.0.0.0/16",
      createVpc: false,
      clusterName: "",
      publicSubnets: [],
      privateSubnets: [],
      imageType: "",
      clusterTemplate: "",
      subnet_1: "10.0.0.0/24",
      subnet_2: "10.0.1.0/24",
      subnet_3: "10.0.2.0/24",
      awsToolId: ""
    }
};

export default ec2ClusterCreationTaskConfigurationMetadata;