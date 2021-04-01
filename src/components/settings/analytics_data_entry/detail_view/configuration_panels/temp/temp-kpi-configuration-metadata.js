const tempKpiConfigurationMetadata = {
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
      label: "Timeline",
      id: "timeline",
      // isRequired: true
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
      maxLength: 5
    },
    {
      label: "Executed Test Cases",
      id: "test_cases_executed",
      maxLength: 5
    },
    {
      label: "Passed Test Cases",
      id: "test_cases_passed",
      maxLength: 5
    },
    {
      label: "Failed Test Cases",
      id: "test_cases_failed",
      maxLength: 5
    },
    {
      label: "Skipped Test Cases",
      id: "test_cases_skipped",
      maxLength: 5
    },
  ],
  newObjectFields: {
    domain: "",
    application: "",
    pipeline_id: "",
    timeline: {},
    sprint: "",
    release: "",
    test_cases_total: 0,
    test_cases_executed: 0,
    test_cases_passed: 0,
    test_cases_failed: 0,
    test_cases_skipped: 0
  }
};

export default tempKpiConfigurationMetadata;