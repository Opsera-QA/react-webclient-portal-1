const apigeeReportMetaData = {
  type: "Apigee Report Metadata",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Revision",
      id: "revision"
    },
    {
      label: "Status",
      id: "state"
    },
    {
      label: "New Asset",
      id: "isNew"
    },
  ],
  newObjectFields: {
    name: "",
    type: "",
    revision: "",
    state: "",
    isNew: false,
  }
};

export default apigeeReportMetaData;