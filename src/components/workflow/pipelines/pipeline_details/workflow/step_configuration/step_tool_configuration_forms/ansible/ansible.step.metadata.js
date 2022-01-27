const ansibleStepMetadata = {
  type: "Ansible Tool Configuration",
  fields: [
    {
      label: "Ansible Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    {
      label: "Project ID",
      id: "projectId",
    },
    {
      label: "Source Control Management Service Type",
      id: "service",
    },
    {
      label: "GIT URL",
      id: "gitUrl"
    },
    {
      label: "SSH URL",
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
    },
    {
      label: "Workspace",
      id: "workspace"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Branch",
      id: "defaultBranch",
    },
    {
      label: "Playbook File Name",
      id: "playbookFileName",
    },
    {
      label: "Playbook File Path",
      id: "playbookFilePath",
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    gitToolId: "",
    repoId: "",
    projectId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    defaultBranch: "",
    playbookFileName : "",
    playbookFilePath : "",
  }
};

export default ansibleStepMetadata;