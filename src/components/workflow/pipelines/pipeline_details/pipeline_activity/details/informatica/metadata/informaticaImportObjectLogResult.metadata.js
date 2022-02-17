const informaticaImportObjectLogResultMetaData = {
  type: "Informatica Import Summary Log Result Metadata",
  fields: [
    {
      label: "Request ID",
      id: "id",
    },
    {
      label: "Source Object",
      id: "sourceObject",
    },
    {
      label: "Target Object",
      id: "targetObject",
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Source Name",
      id: "sourceObject.name"
    },
    {
      label: "Source Path",
      id: "sourceObject.name"
    },
    {
      label: "Source Type",
      id: "sourceObject.name"
    },    
    {
      label: "Target Name",
      id: "targetObject.name"
    },
    {
      label: "Target Path",
      id: "targetObject.name"
    },
    {
      label: "Target Type",
      id: "targetObject.name"
    },    
    {
      label: "Status/State",
      id: "status.state"
    },
  ],
  newObjectFields: {
    id: "",
    sourceObject: "",
    targetObject: "",
    status: {}
  }
};

export default informaticaImportObjectLogResultMetaData;