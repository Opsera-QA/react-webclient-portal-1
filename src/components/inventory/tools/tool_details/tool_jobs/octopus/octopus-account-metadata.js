const OctopusAccountMetadata = {
  type: "Octopus Account",
  fields: [
    {
      label: "type",
      id: "type",
      isRequired: true
    },
    {
      label: "Cloud Credentials",
      id: "awsToolConfigId",
    },
    {
      label: "Cloud Credentials",
      id: "azureToolConfigId",
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
      label: "Cloud Type",
      id: "cloudType",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "ID",
      id: "id"
    }
],
  newObjectFields: {
    _id: "",
    type: "account",
    cloudType : "",
    awsToolConfigId : "",
    azureToolConfigId: "",
    environmentIds : "",
    name : "",
    spaceId : "",
    spaceName : "",
    description: "",
    toolId : "",
    id: "",
    active: true,
  }
};

export default OctopusAccountMetadata;