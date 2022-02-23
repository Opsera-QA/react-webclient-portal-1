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
    {
      label: "URL",
      id: "url",
      isRequired: true
    },
    {
      label: "Slug",
      id: "slug"
    },
  ],
  newObjectFields:
    {
      organizationName: "",
      publicKey: "",
      url: ""
    }
};

export default BuildkiteMetadata;