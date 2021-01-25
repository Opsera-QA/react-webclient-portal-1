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
      id: "toolURL",
      isRequired: true
    },
    {
      id: "userName",
      isRequired: true
    },
    {
      id: "secretKey",
      isRequired: true
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
    }
  ],
  newModelBase: {
    groupName: "",
    artifactName: "",
    type: "",
    repositoryName: "",
    artifactStepId: "",
    toolURL: "",
    userName: "",
    secretKey: "",
    customVersion: false,
    repositoryGroup : "",
    nexusToolConfigId: "",
  }
};

export default nexusStepFormMetadata;