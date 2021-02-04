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
    }
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
    active: true,
  }
};

export default OctopusTargetMetadata;