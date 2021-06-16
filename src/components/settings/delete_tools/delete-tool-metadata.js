const DeleteToolMetadata = {
    type: "Delete Tool",
    fields: [
      {
        label: "Application",
        id: "applicationId",
        isRequired: true,
      },
      {
        label: "Tools",
        id: "toolsList",
        isRequired: true,
      },
    ],
    newModelBase: {
        applicationId: "",
        toolsList: []
    },
  };
  
  export default DeleteToolMetadata;
  