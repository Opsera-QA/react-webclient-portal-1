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
      label: "Public Subnet 1",
      id: "public_subnet_1",
    },
    {
      label: "Public Subnet 2",
      id: "public_subnet_2",
    },
    {
      label: "Private Subnet CIDR 1",
      id: "private_subnet_cidr_1",
    },
    {
      label: "Private Subnet CIDR 2",
      id: "private_subnet_cidr_2",
    },
    {
      label: "Public Subnet CIDR 1",
      id: "public_subnet_cidr_1",
    },
    {
      label: "Public Subnet CIDR 2",
      id: "public_subnet_cidr_2",
    },
    {
      label: "AWS Tool",
      id: "awsToolId",
      isRequired: true
    },
    {
      label: "Security Group",
      id: "securityGroup"
    },
    {
      label: "Existing VPC",
      id: "vpcId"
    },
    {
      label: "EC2 Instance Type",
      id: "instanceType"
    },
    {
      label: "Subnets",
      id: "subnets"
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
      public_subnet_1: "10.0.0.0/24",
      public_subnet_2: "10.0.1.0/24",
      private_subnet_cidr_1: "10.194.20.0/24",
      private_subnet_cidr_2: "10.194.21.0/24",
      public_subnet_cidr_1 : "10.194.10.0/24",
      public_subnet_cidr_2 : "10.194.11.0/24",
      awsToolId: "",
      securityGroup : "",
      vpcId : "",
      instanceType : "",
      subnets : []
    }
};

export default ec2ClusterCreationTaskConfigurationMetadata;