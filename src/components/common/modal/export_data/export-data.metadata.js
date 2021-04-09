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
    "exportOption": "pdf",
    "fileName": ""
  }
};

export default exportDataMetadata;