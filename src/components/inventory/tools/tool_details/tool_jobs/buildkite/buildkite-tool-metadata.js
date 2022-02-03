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
      id: "publicKey",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      organizationName: "",
      publicKey: "",
    }
};

export default BuildkiteMetadata;