const buildkiteMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "Buildkite Tool",
      id: "toolConfigId",
      isRequired: true
    }
  ],
  newObjectFields: {
    toolConfigId: ""
  }
};

export default buildkiteMetadata;