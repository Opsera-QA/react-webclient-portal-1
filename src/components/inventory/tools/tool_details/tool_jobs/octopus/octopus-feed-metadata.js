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
      label: "Nexus Tool",
      id: "nexusToolId",
      isRequired: true
    },
    {
      label: "Nexus Repository",
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
    }
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
  }
};

export default OctopusFeedMetadata;