const automationPercentageMetadata = {
  type: "Automation Percentage Configuration",
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
      label: "Project Name",
      id: "project",
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
      label: "Total no of Automation Candidates",
      id: "total_tests",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "No of Regression Test Cases Automated",
      id: "total_automated",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total No of Functional Test Cases",
      id: "functional_tests",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total No of Regression Test Cases",
      id: "regression_tests",
      maxLength: 5,
      isRequired: true
    }
  ],
  newObjectFields: {
    domain: [],
    application: [],
    project: [],
    pipeline_id: "",
    from: new Date(),
    to: new Date(),
    sprint: [],
    release: [],
    total_tests: 0,
    total_automated: 0
  }
};

export default automationPercentageMetadata;