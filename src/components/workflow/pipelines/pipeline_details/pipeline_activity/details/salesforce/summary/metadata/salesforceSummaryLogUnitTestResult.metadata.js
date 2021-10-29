const salesforceSummaryLogUnitTestResultMetadata = {
  type: "Salesforce Summary Log Unit Test Result Metadata",
  fields: [
    {
      label: "Namespace",
      id: "namespace",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Outcome",
      id: "outcome",
    },
    {
      label: "Method Name",
      id: "methodName"
    },
    {
      label: "Time",
      id: "time"
    },
    {
      label: "Test Timestamp",
      id: "testTimestamp"
    },
    {
      label: "System Modstamp",
      id: "systemModstamp"
    },
    {
      label: "Apex Class",
      id: "apexClass"
    },
    {
      label: "Apex Class Name",
      id: "apexClass.name"
    },
    {
      label: "Length Without Comments",
      id: "apexClass.lengthWithoutComments"
    },
    {
      label: "Type",
      id: "apexClass.attributes.type"
    },
    {
      label: "URL",
      id: "apexClass.attributes.url"
    },
  ],
  newObjectFields: {
    namespace: "",
    name: "",
    methodName: "",
    outcome: "",
    time: "",
    testTimestamp: "",
    systemModstamp: "",
    apexClass: {
      attributes: {},
    },
  }
};

export default salesforceSummaryLogUnitTestResultMetadata;