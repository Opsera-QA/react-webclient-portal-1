const gitOperationStepFormMetadata = {
  type: "PMD Tool Configuration",
  fields: [
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 150,
      lowercase: true,
    },
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Repository",
      id: "repository",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true,
      maxLength: 255,
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Target Branch",
      id: "targetBranch",
      isRequiredFunction: (model) => {
        return model?.getData("action") === "pr-creation";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Description",
      id: "description",
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
      isRequired: true,
      lowercase: true,
    },
    {
      label: "Add Reviewer",
      id: "addReviewers",
    },
    {
      label: "Select Reviewers",
      id: "prReviewers",
      maxLength: 10,
      minLength: 1,
      isRequiredFunction: (model) => {
        return model?.getData("action") === "pr-creation" && model?.getData("addReviewers") === true;
      },
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
    addReviewers: false,
    prReviewers: [],
  }
};

export default gitOperationStepFormMetadata;