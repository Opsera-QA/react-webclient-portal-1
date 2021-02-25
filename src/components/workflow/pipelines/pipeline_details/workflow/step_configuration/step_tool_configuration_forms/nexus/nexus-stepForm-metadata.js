const nexusStepFormMetadata = {
  type: "Nexus Tool Configuration",
  fields: [
    {
      label: "Group Name",
      id: "groupName",
      isRequired: true
    },
    {
      label: "Artifact Name",
      id: "artifactName",
      isRequired: true
    },
    {
      label: "Nexus Step Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Repository Name",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Select Build Step",
      id: "artifactStepId",
    },
    {
      label: "Use Run count as version?",
      id: "customVersion",
      isRequired: true
    },
    {
      id: "repositoryGroup",
      isRequired: true
    },
    {
      label: "Step Tool",
      id: "nexusToolConfigId",
      isRequired: true
    },
    {
      label: "Package ID",
      id: "packageId"
    }
  ],
  newModelBase: {
    groupName: "",
    artifactName: "",
    type: "",
    repositoryName: "",
    artifactStepId: "",
    customVersion: false,
    repositoryGroup : "",
    nexusToolConfigId: "",
    packageId : ""
  }
};

export default nexusStepFormMetadata;