export const terraformProvidersMetadata = {
    type: "Terraform VCS Provider",
    fields: [
      {
        label: "Provider Name",
        id: "vcsProviderName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Organization Name",
        id: "organizationName",
        isRequired: true
      },
      {
        label: "Service",
        id: "service",
        isRequired: true
      },
      {
        label: "Git Tool Id",
        id: "gitToolId",
        isRequired: true
      },
      {
        label: "oAuth Client Id",
        id: "id",
      },
      {
        label: "Service Provider",
        id: "serviceProviderDisplayName",
      },
      {
        label: "Created At",
        id: "createdAt",
      },
      {
        label: "Callback URL",
        id: "callbackUrl",
      },
    ],
    newObjectFields: {
      vcsProviderName: "",
      organizationName: "",
      service: "",
      gitToolId: "",
      id: "",
      serviceProviderDisplayName: "",
      createdAt: "",
      callbackUrl: "",
      type: "providers",
    }
  };
