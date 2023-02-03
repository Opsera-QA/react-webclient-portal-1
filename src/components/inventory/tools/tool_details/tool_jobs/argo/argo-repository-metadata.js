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
      label: "Repository Name",
      id: "repoId",
      isRequired: true
    },
    {
      label: "Repository Name",
      id: "projectId",
      isRequired: true
    },
    {
      label: "Repository Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Project Name",
      id: "project",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repo",
    },
    {
      label: "Connection Status",
      id: "connectionState",
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
    projectId: "",
    repoId: "",
    type: "git",
    project: "",
  }
};

export default argoRepositoryMetadata;