const salesforceSummaryLogDeployResultMetadata = {
  type: "Salesforce Summary Log Deploy Result Metadata",
  fields: [
    {
      label: "Request ID",
      id: "id",
    },
    {
      label: "Messages",
      id: "messages",
    },
    {
      label: "Retrieve Result",
      id: "retrieveResult"
    },
    {
      label: "Success",
      id: "success"
    },
    {
      label: "Check Only",
      id: "checkOnly"
    },
    {
      label: "Ignore Warnings",
      id: "ignoreWarnings"
    },
    {
      label: "Rollback On Error",
      id: "rollbackOnError"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Number of Components Deployed",
      id: "numberComponentsDeployed"
    },
    {
      label: "Total Number of Components",
      id: "numberComponentsTotal"
    },
    {
      label: "Number of Component Errors",
      id: "numberComponentErrors"
    },
    {
      label: "Number of Tests Completed",
      id: "numberTestsCompleted"
    },
    {
      label: "Total Number of Tests",
      id: "numberTestsTotal"
    },
    {
      label: "Number of Test Errors",
      id: "numberTestErrors"
    },
    {
      label: "Created At",
      id: "createdDate"
    },
    {
      label: "Started At",
      id: "startDate"
    },
    {
      label: "Last Modified At",
      id: "lastModifiedDate"
    },
    {
      label: "Completed At",
      id: "completedDate"
    },
    {
      label: "Error Status Code",
      id: "errorStatusCode"
    },
    {
      label: "Error Message",
      id: "errorMessage"
    },
    {
      label: "State Detail",
      id: "stateDetail"
    },
    {
      label: "Owner",
      id: "createdBy"
    },
    {
      label: "Owner Name",
      id: "createdByName"
    },
    {
      label: "Canceled By User",
      id: "canceledBy"
    },
    {
      label: "Canceled By Name",
      id: "canceledByName"
    },
    {
      label: "Completed",
      id: "done"
    },
    {
      label: "Details",
      id: "details"
    },
  ],
  newObjectFields: {
    id: "",
    messages: "",
    retrieveResult: false,
    success: false,
    checkOnly: false,
    ignoreWarnings: false,
    rollbackOnError: false,
    status: "",
    numberComponentsDeployed: 0,
    numberComponentsTotal: 0,
    numberComponentErrors: 0,
    numberTestsCompleted: 0,
    numberTestsTotal: 0,
    numberTestErrors: 0,
    details: {},
    createdDate: "",
    startDate: "",
    lastModifiedDate: "",
    completedDate: "",
    errorStatusCode: "",
    errorMessage: "",
    stateDetail: "",
    createdBy: "",
    createdByName: "",
    canceledBy: "",
    canceledByName: "",
    done: false,
    runTestsEnabled: false,
    runTestResult: {}
  }
};

export default salesforceSummaryLogDeployResultMetadata;