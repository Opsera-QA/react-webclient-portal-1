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
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true
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
      isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "bitbucket";
      },
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Branch",
      id: "defaultBranch",
      isRequired: true
    },
    {
      label: "Playbook File Name",
      id: "playbookFileName",
      isRequired: true
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