export const terraformProvidersMetadata = {
    type: "Terraform VCS Providers",
    fields: [
      {
        label: "Name",
        id: "vcsProviderName",
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
      vcsProviderName: "",
      organizationName: "",
      type: "providers",
    }
  };
