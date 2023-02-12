import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

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
      isRequired: true,
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Project ID",
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
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
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
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
      isRequired: true,
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
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