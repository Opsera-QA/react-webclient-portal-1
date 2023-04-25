const customSettingMigrationReportMetadata = {
  type: "Custom Setting Migration Report",
  fields: [
    {
      label: "Object List",
      id: "objectList",
    },
    {
      label: "Field List",
      id: "fieldList",
    },
    {
      label: "SOQL Query",
      id: "queryFilter",
    },
    {
      label: "Records Processed",
      id: "recordsProcessed",
    },
    {
      label: "Records Successful",
      id: "recordsSuccessful",
    },
    {
      label: "Records Failed",
      id: "recordsFailed",
    },
    {
      label: "Time Taken",
      id: "timeTaken",
    },
    {
      label: "Error Message",
      id: "errorMessage",
    },
    {
      label: "Dowloadable Report",
      id: "hasDowloadableReport",
    },
    {
      label: "Expiration Time",
      id: "expirationTime",
    },
    {
      label: "Status",
      id: "status",
    },
  ],
  newObjectFields: {
    objectList: "",
    fieldList: "",
    queryFilter: "",
    recordsProcessed: "",
    recordsSuccessful: "",
    recordsFailed: "",
    timeTaken: "",
    errorMessage: "",
    hasDowloadableReport: false,
    expirationTime: "",
    status: "",
  },
};

export default customSettingMigrationReportMetadata;