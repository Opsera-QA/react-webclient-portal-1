const BuildkiteMetadata = {
  type: "Buildkite Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Organization Name",
      id: "organizationName",
      isRequired: true
    },
    {
      label: "Access Token",
      id: "accessToken",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      organizationName: "",
      accessToken: "",
    }
};

export default BuildkiteMetadata;