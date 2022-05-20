const gitOperationStepFormMetadata = {
  type: "PMD Tool Configuration",
  fields: [
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    },
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Target Branch",
      id: "targetBranch",
      isRequiredFunction: (model) => {
        return model?.getData("action") === "pr-creation";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Description",
      id: "description",
      isRequiredFunction: (model) => {
        return model?.getData("action") === "pr-creation";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:"Description for PR"
    },
    {
      label: "Dynamic Tag Name",
      id: "tag",
      formText: "date, timestamp, run_count text can be used to make it dynamic",
      regexDefinitionName: "dockerName",
      maxLength: 50,
      lowercase: true,
      isRequiredFunction: (model) => {
        return model?.getData("action") === "tag-creation";
      },
    },
    {
      label: "Git Action",
      id: "action",
      maxLength: 50,
      lowercase: true,
    },
  ],
  newObjectFields: {
    gitBranch: "",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    repository: "",
    workspace: "",
    action: "",
    targetBranch: "",
    description: "",
    tag: "",
  }
};

export default gitOperationStepFormMetadata;