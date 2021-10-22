export const deleteToolsMetadata = {
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
  newObjectFields: {
    applicationId: "",
    toolsList: []
  },
};
