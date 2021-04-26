const cumulativeOpenDefectsMetadata = {
  type: "Cumulative Open Defects Configuration",
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
      label: "Automated Test Cases Executed",
      id: "total_executed",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Automated Test Cases Executed Manually",
      id: "total_manual",
      maxLength: 5,
      isRequired: true
    }
  ],
  newObjectFields: {
    domain: "",
    application: "",
    project: "",
    pipeline_id: "",
    from: new Date(),
    to: new Date(),
    sprint: "",
    release: "",
    total_executed: 0,
    total_manual: 0
  }
};

export default cumulativeOpenDefectsMetadata;