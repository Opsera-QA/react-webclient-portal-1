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
  ],
  newObjectFields: {
    name: "",
    type: "",
    revision: "",
    state: "",
  }
};

export default apigeeReportMetaData;