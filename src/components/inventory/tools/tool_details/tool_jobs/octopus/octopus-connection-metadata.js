const octopusConnectionMetadata = {
  type: "Octopus API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Octopus URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Octopus Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Octopus API Key",
      id: "octopusApiKey",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      toolURL: "",
      userName: "",
      octopusApiKey: ""
    }
};

export default octopusConnectionMetadata;