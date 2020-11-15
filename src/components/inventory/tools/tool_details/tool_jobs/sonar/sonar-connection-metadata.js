const sonarConnectionMetadata = {
  type: "Octopus API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Octopus URL",
      id: "toolURL",
      isRequired: true
    },
    {
      label: "Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Octopus API Key",
      id: "octopusApiKey",
      isRequired: true
    }
  ],
  newModelBase:
    {
      sonarUrl: "",
      sonarPort : "",
      sonarUserId : "",
      sonarAuthToken : "",
    }
};

export default sonarConnectionMetadata;