// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
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