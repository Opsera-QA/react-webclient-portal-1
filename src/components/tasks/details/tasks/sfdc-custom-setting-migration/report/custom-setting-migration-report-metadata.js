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
      label: "Filter Query",
      id: "filterQuery",
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
  ],
  newObjectFields: {
    objectList: "",
    fieldList: "",
    filterQuery: "",
    recordsProcessed: "",
    recordsSuccessful: "",
    recordsFailed: "",
    timeTaken: "",
    errorMessage: "",
    hasDowloadableReport: false,
    expirationTime: "",
  },
};

export default customSettingMigrationReportMetadata;