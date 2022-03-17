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
        id: "workflowType",
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
          return model?.getData("workflowType") === "VCS";
        },
      },
      {
        label: "VCS Service",
        id: "service",
        isRequiredFunction: (model) => {
          return model?.getData("workflowType") === "VCS";
        },
      },
      {
        label: "VCS Provider",
        id: "provider",
        isRequiredFunction: (model) => {
          return model?.getData("workflowType") === "VCS";
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
          return model?.getData("workflowType") === "VCS";
        },
      },
      {
        label: "Branch",
        id: "branch",
        isRequiredFunction: (model) => {
          return model?.getData("workflowType") === "VCS";
        },
      },
    ],
    newObjectFields: {
      workspaceName: "",
      organizationName: "",
      description: "",
      workflowType: "CLI",
      workingDirectory: "",
      version: "",
      service: "",
      provider: "",
      providerId: "",
      oauthToken: "",
      repository: "",
      branch: "",
      type: "workspaces",
    }
  };
