const SnaplogicStepFormMetadata = {
  type: "Snaplogic Step Configuration",
  fields: [
    {
      label: "Snaplogic Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "SCM Service",
      id: "service",
      isRequired: true
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true
    },    
    {
      label: "Repo ID",
      id: "repoId",
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Snaplogic Project Space",
      id: "projectSpace",
      isRequired: true
    },
    {
      label: "Snaplogic Project",
      id: "project",
      isRequired: true
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    gitToolId: "",
    service: "",
    gitRepository: "",    
    repoId: "",
    gitBranch: "",
    projectSpace: "",
    project: "",
  }
};

export default SnaplogicStepFormMetadata;
