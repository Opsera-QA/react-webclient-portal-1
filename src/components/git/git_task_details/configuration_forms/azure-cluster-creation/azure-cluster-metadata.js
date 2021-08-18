const azureAksClusterTaskConfigurationMetadata = {
  type: "Azure Cluster Creation Configuration",
  fields: [
    {
      label: "Cluster Name",
      id: "clustername",
      isRequired: true
    },
    {
      label: "Azure Region",
      id: "region",
      isRequired: true,
    },
    {
      label: "Disk Size",
      id: "disk_size_gb",
      isRequired: true,
      formText: "Disk size is in GB, Range: 1-500",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Minimum Nodes",
      id: "node_min_count",
      isRequired: true,
      formText: "Range: 1-20",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Maximum Nodes",
      id: "node_max_count",
      isRequired: true,
      formText: "Range: 1-20",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Machine Type",
      id: "machine_type",
      isRequired: true
    },
    {
      label: "VPC CIDR Block",
      id: "vpcCIDRblock",
      isRequired: true,
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      maxLength: 30
    },
    {
      label: "Subnet CIDR Block",
      id: "subnetCIDRblock",
      isRequired: true,
      regexValidator: /^[A-Za-z0-9-.:/]*$/,
      maxLength: 30
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      clustername : "",
      region : "",
      disk_size_gb : "",
      node_min_count : "",
      node_max_count : "",
      machine_type : "",
      vpcCIDRblock : "",
      subnetCIDRblock : "",
      azureToolConfigId: "",
      azureCredentialId: ""
    }
};

export default azureAksClusterTaskConfigurationMetadata;