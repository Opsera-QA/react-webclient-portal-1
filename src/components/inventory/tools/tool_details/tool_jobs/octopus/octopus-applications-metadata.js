export const octopusApplicationsMetadata = {
  type: "Octopus Environment",
  fields: [
    {
      label: "Type",
      id: "configuration.type",
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
      id: "configuration.spaceName",
      isRequired: true
    },
    {
      label: "Space ID",
      id: "configuration.spaceId",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "ID",
      id: "id"
    }
],
  newObjectFields: {
    _id: "",
    type: "environment",
    name : "",
    spaceName : "",
    description: "",
    toolId : "",
    spaceId : "",
    id: "",
    active: true,
  }
};
