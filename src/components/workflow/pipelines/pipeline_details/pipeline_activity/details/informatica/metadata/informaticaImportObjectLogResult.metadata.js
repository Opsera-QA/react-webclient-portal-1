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
      id: "sourceObject.path"
    },
    {
      label: "Source Type",
      id: "sourceObject.type"
    },    
    {
      label: "Target Name",
      id: "targetObject.name"
    },
    {
      label: "Target Path",
      id: "targetObject.path"
    },
    {
      label: "Target Type",
      id: "targetObject.type"
    },    
    {
      label: "Status/State",
      id: "status.state"
    },
  ],
  newObjectFields: {
    id: "",
    sourceObject: {},
    targetObject: {},
    status: {}
  }
};

export default informaticaImportObjectLogResultMetaData;