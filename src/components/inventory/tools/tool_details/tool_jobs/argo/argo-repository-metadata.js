const argoRepositoryMetadata = {
  type: "Argo Repository",
  fields: [
    {
      label: "Argo Tool",
      id: "toolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "SCM type",
      id: "service",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },   
    {
      id: "gitUrl",
    },
    {
      id: "sshUrl",
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Repository Name",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Repository Type",
      id: "repositoryType",
      isRequired: true
    },
    {
      label: "Project Name",
      id: "projectName",
      isRequired: true
    },
  ],
  newObjectFields: {
    name: "",
    gitToolId: "",
    service: "",
    gitUrl: "",
    sshUrl: "",
    workspace: "",
    repositoryName: "",
    repositoryType: "git",
    projectName: "",
  }
};

export default argoRepositoryMetadata;