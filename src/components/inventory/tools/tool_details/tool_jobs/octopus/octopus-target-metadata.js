const OctopusTargetMetadata = {
  type: "Octopus Target",
  fields: [
    {
      label: "type",
      id: "type",
      isRequired: true
    },
    {
      label: "AWS Credentials",
      id: "awsToolConfigId"
    },
    {
      label: "Octopus Configured Account",
      id: "accountId",
      isRequired: true
    },
    {
      label: "Cluster Name",
      id: "clusterName"
    },
    {
      label: "Environments",
      id: "environmentIds",
      isRequired: true
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Space ID",
      id: "spaceId",
      isRequired: true
    },
    {
      label: "Space Name",
      id: "spaceName",
      isRequired: true
    },
    {
      label: "Communication Style",
      id: "communicationStyle"
    },
    {
      label: "Resource Group Name",
      id: "resourceGroupName"
    },
    {
      label: "Web App Name",
      id: "webAppName"
    },
    {
      label: "Web App Slot Name",
      id: "webAppSlotName"
    },
    {
      label: "Cloud Type",
      id: "cloudType",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "ID",
      id: "id"
    },
    {
      label: "Thumbprint",
      id: "thumbprint"
    },
    {
      label: "Host Name",
      id: "hostName"
    },
    {
      label: "Port",
      id: "port"
    },
    {
      label: "Health Status",
      id: "healthStatus"
    },
],
fieldsIis: [
  {
    label: "type",
    id: "type",
    isRequired: true
  },
  {
    label: "AWS Credentials",
    id: "awsToolConfigId"
  },
  {
    label: "Octopus Configured Account",
    id: "accountId"    
  },
  {
    label: "Cluster Name",
    id: "clusterName"
  },
  {
    label: "Environments",
    id: "environmentIds",
    isRequired: true
  },
  {
    label: "Name",
    id: "name",
    isRequired: true
  },
  {
    label: "Space ID",
    id: "spaceId",
    isRequired: true
  },
  {
    label: "Space Name",
    id: "spaceName",
    isRequired: true
  },
  {
    label: "Communication Style",
    id: "communicationStyle"
  },
  {
    label: "Resource Group Name",
    id: "resourceGroupName"
  },
  {
    label: "Web App Name",
    id: "webAppName"
  },
  {
    label: "Web App Slot Name",
    id: "webAppSlotName"
  },
  {
    label: "Cloud Type",
    id: "cloudType",
    isRequired: true
  },
  {
    label: "Active",
    id: "active",
  },
  {
    label: "ID",
    id: "id"
  },
  {
    label: "Thumbprint",
    id: "thumbprint"
  },
  {
    label: "Host Name",
    id: "hostName",
    isRequired: true
  },
  {
    label: "Port",
    id: "port",
    isRequired: true
  },
  {
    label: "Health Status",
    id: "healthStatus",
    isRequired: true
  },
],
  newModelBase: {
    _id: "",
    type: "target",
    awsToolConfigId : "",
    toolId : "",
    clusterName: "",
    environmentIds: "",
    name: "",
    spaceId: "",
    spaceName: "",
    accountId: "",
    communicationStyle: "",
    resourceGroupName: "",
    webAppName: "",
    webAppSlotName: "",
    cloudType: "",
    id: "",
    active: true,
    thumbprint: "",
    hostName: "",
    port: "10933",
    healthStatus: ""
  }
};

export default OctopusTargetMetadata;
