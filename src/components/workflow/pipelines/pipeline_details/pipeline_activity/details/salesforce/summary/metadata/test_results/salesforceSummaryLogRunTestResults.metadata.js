const salesforceSummaryLogRunTestResultMetadata = {
  type: "Salesforce Summary Log Run Test Results",
  fields: [
    {
      label: "Successes",
      id: "successes",
    },
    {
      label: "Failures",
      id: "failures",
    },
    {
      label: "Total Time",
      id: "totalTime"
    },
    {
      label: "Apex Log ID",
      id: "apexLogId"
    },
    {
      label: "Number of Failures",
      id: "numFailures"
    },
    {
      label: "Code Coverage Warnings",
      id: "codeCoverageWarnings"
    },
    {
      label: "Flow Coverage Warnings",
      id: "flowCoverageWarnings"
    },
    {
      label: "Number of Tests Run",
      id: "numTestsRun"
    },
    {
      label: "Code Coverage",
      id: "codeCoverage"
    },
  ],
  newObjectFields: {
    successes: [],
    failures: [],
    totalTime: 0,
    apexLogId: "",
    flowCoverage: [],
    numFailures: 0,
    numTestsRun: 0,
    codeCoverageWarnings: [],
    flowCoverageWarnings: [],
    codeCoverage: [],
  }
};

export default salesforceSummaryLogRunTestResultMetadata;