const exportDataMetadata = {
  type: "Export Data",
  fields: [
    {
      label: "Export Option",
      id: "exportOption"
    },
    {
      label: "File Name",
      id: "fileName",
    },
  ],
  newObjectFields: {
    "exportOption": "formatted",
    "fileName": ""
  }
};

export default exportDataMetadata;