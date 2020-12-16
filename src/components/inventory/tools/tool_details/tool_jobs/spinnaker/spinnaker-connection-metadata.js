const spinnakerConnectionMetadata = {
  type: "Spinnaker Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Spinnaker URL",
      id: "toolURL",
      isRequired: true
    },
  ],
  newModelBase:
    {
      toolURL: "",
    }
};

export default spinnakerConnectionMetadata;