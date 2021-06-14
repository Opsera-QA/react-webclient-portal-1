const automatedTestResultsConfigMetadata = {
  type: "Temp KPI Configuration",
  fields: [
    {
      label: "Domain Name",
      id: "domain",
      isRequired: true,
      maxLength: 20
    },
    {
      label: "Application Name",
      id: "application",
      isRequired: true,
      maxLength: 20
    },
    {
      label: "Pipeline",
      id: "pipeline_id",
      // isRequired: true
    },
    {
      label: "From",
      id: "from",
      isRequired: true
    },
    {
      label: "To",
      id: "to",
      isRequired: true
    },
    {
      label: "Sprint Name",
      id: "sprint",
      // isRequired: true,
      maxLength: 20
    },
    {
      label: "Release Name",
      id: "release",
      maxLength: 20
    },
    {
      label: "Total Test Cases",
      id: "test_cases_total",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Executed Test Cases",
      id: "test_cases_executed",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Passed Test Cases",
      id: "test_cases_passed",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Failed Test Cases",
      id: "test_cases_failed",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Blocked Test Cases",
      id: "test_cases_blocked",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Skipped Test Cases",
      id: "test_cases_skipped",
      maxLength: 5,
      isRequired: true
    },
  ],
  newObjectFields: {
    domain: [],
    application: [],
    pipeline_id: "",
    from: new Date(),
    to: new Date(),
    sprint: [],
    release: [],
    test_cases_total: 0,
    test_cases_executed: 0,
    test_cases_passed: 0,
    test_cases_failed: 0,
    test_cases_blocked: 0,
    test_cases_skipped: 0
  }
};

export default automatedTestResultsConfigMetadata;