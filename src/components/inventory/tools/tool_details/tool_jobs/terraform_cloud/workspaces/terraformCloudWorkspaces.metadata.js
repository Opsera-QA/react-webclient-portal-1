export const terraformCloudWorkspacesMetadata = {
    type: "Terraform Cloud Workspace",
    fields: [
      {
        label: "Workspace Name",
        id: "workspaceName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Organization Name",
        id: "organizationName",
        isRequired: true
      },
      {
        label: "Description",
        id: "description",
      },
      {
        label: "Workflow Type",
        id: "workFlowType",
        isRequired: true
      },
      {
        label: "Working Directory",
        id: "workingDirectory",
      },      
      {
        label: "Terraform Version",
        id: "version",
        isRequiredFunction: (model) => {
          return model?.getData("workFlowType") === "VCS";
        },
      },
      {
        label: "VCS Service",
        id: "service",
        isRequiredFunction: (model) => {
          return model?.getData("workFlowType") === "VCS";
        },
      },
      {
        label: "VCS Provider",
        id: "provider",
        isRequiredFunction: (model) => {
          return model?.getData("workFlowType") === "VCS";
        },
      },
      {        
        id: "providerId",        
      },
      {        
        id: "oauthToken",        
      },
      {
        label: "Repository",
        id: "repository",
        isRequiredFunction: (model) => {
          return model?.getData("workFlowType") === "VCS";
        },
        formText: "If you cannot find your Repository in the list, please choose 'Others' option and enter the Repoitory Name",
      },
      {
        label: "Repository Name",
        id: "repositoryText",
      },
      {
        label: "Branch",
        id: "branch",
        isRequiredFunction: (model) => {
          return model?.getData("workFlowType") === "VCS";
        },
      },
    ],
    newObjectFields: {
      workspaceName: "",
      organizationName: "",
      description: "",
      workFlowType: "CLI",
      workingDirectory: "",
      version: "",
      service: "",
      provider: "",
      providerId: "",
      oauthToken: "",
      repository: "",
      branch: "",
      type: "workspaces",
      repositoryText: "",
    }
  };
