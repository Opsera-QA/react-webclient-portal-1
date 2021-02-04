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
      label: "Password",
      id: "password",
      isRequired: true
    },
    {
      label: "Username",
      id: "username",
      isRequired: true
    },
    {
      label: "Feed URI",
      id: "feedUri",
      isRequired: true
    },
    {
      label: "Active",
      id: "active",
    }
  ],
  newModelBase: {
    _id: "",
    type: "feed",
    name : "",
    spaceName : "",
    feedType: "",
    toolId : "",
    spaceId : "",
    password: "",
    username: "",
    feedUri: "",
    active: true,
  }
};

export default OctopusFeedMetadata;