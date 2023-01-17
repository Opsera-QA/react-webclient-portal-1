const snykConnectionMetadata = {
  type: "Snyk Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Connectivity Type",
      id: "connectivityType",
      isRequired: true,
    },
    {
      label: "Authorization Token",
      id: "token",
      isRequired: true,
    },
    {
      label: "Organization ID",
      id: "organization",
      isRequired: true,
    },
  ],
  newObjectFields: {
    connectivityType: "Snyk CLI",
    token: "",
    organization: "",
  },
};

export default snykConnectionMetadata;
