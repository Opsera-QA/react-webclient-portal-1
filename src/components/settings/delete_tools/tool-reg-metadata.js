const ToolRegMetadata = {
    type: "Tool Registry Table",
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
        label: "Created Date",
        id: "createdAt",
      }
    ],
    newModelBase: {
      _id: "",
      name: "",
      createdAt: ""
    },
  };
  
  export default ToolRegMetadata;
  