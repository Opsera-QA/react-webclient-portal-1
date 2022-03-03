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
    ],
    newObjectFields: {
      workspaceName: "",
      organizationName: "",
      type: "workspaces",
    }
  };
