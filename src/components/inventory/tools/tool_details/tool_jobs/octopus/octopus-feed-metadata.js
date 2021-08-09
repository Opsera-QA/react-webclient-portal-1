const OctopusFeedMetadata = {
  type: "Octopus External Feed",
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Feed Type",
      id: "feedType",
      isRequired: true
    },
    {
      label: "Tool Type",
      id: "toolType",
      isRequired: true
    },
    {
      label: "Tool ID",
      id: "toolId",
      isRequired: true
    },
    {
      label: "Space Name",
      id: "spaceName",
      isRequired: true
    },
    {
      label: "Space ID",
      id: "spaceId",
      isRequired: true
    },
    {
      label: "Tool",
      id: "nexusToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "nexusRepository",
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
      label: "Azure Tool",
      id: "azureToolId"
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId"
    },
    {
      label: "Registry Name",
      id: "azureRegistryName"
    },
    {
      label: "Registry Path",
      id: "azureRegistryPath"
    },
  ],
  newObjectFields: {
    _id: "",
    type: "feed",
    name : "",
    spaceName : "",
    feedType: "",
    toolId : "",
    spaceId : "",
    nexusToolId: "",
    nexusRepository: "",
    id: "",
    active: true,
    toolType: "",
    azureToolId: "",
    azureCredentialId: "",
    azureRegistryName: "",
    azureRegistryPath: ""
  }
};

export default OctopusFeedMetadata;