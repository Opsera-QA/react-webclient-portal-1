const OctopusEnvironmentMetadata = {
  type: "Octopus Environment",
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
      label: "Description",
      id: "description",
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
      label: "Active",
      id: "active",
    }
],
  newModelBase: {
    _id: "",
    type: "environment",
    name : "",
    spaceName : "",
    description: "",
    toolId : "",
    spaceId : "",
    active: true,
  }
};

export default OctopusEnvironmentMetadata;