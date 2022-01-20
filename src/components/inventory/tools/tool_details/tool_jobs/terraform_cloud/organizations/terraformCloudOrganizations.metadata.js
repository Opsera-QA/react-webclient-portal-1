export const terraformCloudOrganizationsMetadata = {
    type: "Terraform Cloud Organization",
    fields: [
      {
        label: "Terraform Cloud Organization Name",
        id: "organizationName",
        isRequired: true,
        maxLength: 100
      },
    ],
    newObjectFields: {
      organizationName: "",
      type: "organizations",
    }
  };
