const boomiReportMetadata = {
  type: "Boomi Summary Log Result Metadata",
  fields: [
    {
      label: "Component ID",
      id: "componentId",
    },
    {
      label: "Package Version",
      id: "packageVersion",
    },
    {
      label: "Notes",
      id: "notes",
    },
    {
      label: "Package ID",
      id: "packageId",
    },
    {
      label: "Component Version",
      id: "componentVersion",
    },
    {
      label: "Component Type",
      id: "componentType",
    },
    {
      label: "Created Date",
      id: "createdDate",
    },
    {
      label: "Created By",
      id: "createdBy",
    },
    {
      label: "Shareable",
      id: "shareable",
    },
    {
      label: "Error Message",
      id: "errorMessage",
    },
  ],
  newObjectFields: {
    componentId: "",
    packageVersion: "",
    notes: "",
    packageId: "",
    componentVersion: "",
    componentType: "",
    createdDate: "",
    createdBy: "",
    shareable: "",
    errorMessage: ""
  },
};

export default boomiReportMetadata;
