const OctopusAccountMetadata = {
  type: "Octopus Account",
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
      label: "toolId",
      id: "toolId",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    }
],
  newModelBase: {
    _id: "",
    type: "account",
    awsToolConfigId : "",
    environmentIds : "",
    name : "",
    spaceId : "",
    spaceName : "",
    toolId : "",
    active: true,
  }
};

export default OctopusAccountMetadata;