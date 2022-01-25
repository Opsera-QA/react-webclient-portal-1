const ec2ClusterCreationTaskConfigurationMetadata = {
  type: "EC2 Cluster Creation Configuration",
  fields: [
    {
      label: "VPC CIDR Block",
      id: "vpcCidrBlock",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText: "Sample Format - 10.0.0.0/16",
      maxLength: 30
    },
    {
      label: "Cluster Template",
      id: "clusterTemplate",
      isRequired: true
    },
    {
      label: "Create VPC?",
      id: "createVpc",
    },
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true,
      maxLength: 32,
      regexValidator: /^[A-Za-z0-9-.:]*$/,
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
      label: "Public Subnet 1",
      id: "public_subnet_1",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.0.0.0/24",
      maxLength: 30
    },
    {
      label: "Public Subnet 2",
      id: "public_subnet_2",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.0.0.0/24",
      maxLength: 30
    },
    {
      label: "Private Subnet CIDR 1",
      id: "private_subnet_cidr_1",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.194.20.0/24",
      maxLength: 30
    },
    {
      label: "Private Subnet CIDR 2",
      id: "private_subnet_cidr_2",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.194.21.0/24",
      maxLength: 30
    },
    {
      label: "Public Subnet CIDR 1",
      id: "public_subnet_cidr_1",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.194.10.0/24",
      maxLength: 30
    },
    {
      label: "Public Subnet CIDR 2",
      id: "public_subnet_cidr_2",
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      formText : "Sample Format - 10.194.11.0/24",
      maxLength: 30
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
      label: "Key Pair",
      id: "keyPair"
    },
    {
      label: "Private Subnets",
      id: "privateSubnets",
      maxItems: 2,
      formText : "Both subnets should be from different availability zones. Maximum 2 subnets permitted.",
    },
    {
      label: "Stack ID",
      id: "stackId"
    },
    {
      label: "Region",
      id: "region"
    }
  ],
  newObjectFields:
    {
      vpcCidrBlock: "",
      createVpc: false,
      clusterName: "",
      publicSubnets: [],
      imageType: "",
      clusterTemplate: "",
      public_subnet_1: "",
      public_subnet_2: "",
      private_subnet_cidr_1: "",
      private_subnet_cidr_2: "",
      public_subnet_cidr_1 : "",
      public_subnet_cidr_2 : "",
      privateSubnets: [],
      awsToolId: "",
      securityGroup : "",
      vpcId : "",
      instanceType : "",
      keyPair: "",
      region: ""
    }
};

export default ec2ClusterCreationTaskConfigurationMetadata;