const ToolMetadata = {
    type: "Platform Tool",
    fields: [
      {
        label: "Id",
        id: "_id",
      },
      {
        label: "Name",
        id: "name",
      },
      {
        label: "Tool Status",
        id: "toolStatus",
      },
      {
        label: "Installation Date",
        id: "installationDate",
      },
      {
        label: "Tool URL",
        id: "toolURL",
      },
    ],
  newObjectFields: {
      _id: "",
      name: "",
      toolStatus: "",
      installationDate: "",
      toolURL: ""
    },
  };
  
  export default ToolMetadata;
  