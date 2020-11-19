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
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Octopus Configured AWS Account",
      id: "accountId",
      isRequired: true
    },
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true
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
    active: true,
  }
};

export default OctopusTargetMetadata;