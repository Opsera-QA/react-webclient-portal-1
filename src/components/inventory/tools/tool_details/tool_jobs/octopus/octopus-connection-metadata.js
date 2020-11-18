const octopusConnectionMetadata = {
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
      toolURL: "",
      userName: "",
      octopusApiKey: ""
    }
};

export default octopusConnectionMetadata;