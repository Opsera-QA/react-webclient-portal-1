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
      formText: "Disk size is in GB, Range: 1-1000",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Minimum Nodes",
      id: "node_min_count",
      formText: "Range: 1-20",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Maximum Nodes",
      id: "node_max_count",
      formText: "Range: 1-20",
      regexDefinitionName: "numericalField",
    },
    {
      label: "Machine Type",
      id: "machine_type",
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
    {
      label: "Azure Kubernetes Version",
      id: "aksKubeVersion",
      formText: "This indicates the default kubernetes version for the selected region.",
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
      azureCredentialId: "",
      aksKubeVersion: ""
    }
};

export default azureAksClusterTaskConfigurationMetadata;