const openDefectsMetadata = {
  type: "COD Configuration",
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
      label: "Total Defects",
      id: "total_defects",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total Valid Defects Open",
      id: "valid_defects_open",
      maxLength: 5,
      isRequired: true
    },
    {
      label: "Total Valid Defects Closed",
      id: "valid_defects_closed",
      maxLength: 5,
      // isRequired: true
    },
  ],
  newObjectFields: {
    domain: "",
    application: "",
    pipeline_id: "",
    from: new Date(),
    to: new Date(),
    sprint: "",
    release: "",
    total_defects: 0,
    valid_defects_open: 0,
    valid_defects_closed: 0
  }
};

export default openDefectsMetadata;