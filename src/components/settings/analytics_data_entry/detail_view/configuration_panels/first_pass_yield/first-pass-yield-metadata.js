const firstPassYieldMetadata = {
  type: "FPY Configuration",
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
      label: "Total Test Cases Planned for First Run",
      id: "total_test_cases",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total Test Cases Passed in First Run",
      id: "test_cases_passed",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total Test Cases Failed in First Run",
      id: "test_cases_failed",
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
    total_test_cases: 0,
    test_cases_passed: 0,
    test_cases_failed: 0
  }
};

export default firstPassYieldMetadata;