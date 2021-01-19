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
  newObjectFields:
    {
      toolURL: "",
    }
};

export default spinnakerConnectionMetadata;