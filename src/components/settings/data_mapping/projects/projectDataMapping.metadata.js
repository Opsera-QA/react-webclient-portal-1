const metadataConstants = require("@opsera/definitions/constants/metadata/metadata.constants");

const projectDataMappingMetadata = {
  idProperty: "_id",
  type: "Project Mapping",
  activeField: "active",
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Tool",
      id: "tool_identifier",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Tool Registry Entry",
      id: "tool_id",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Mapping Key",
      id: "key",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Full Mapping Key",
      id: "keyPath",
      isRequiredFunction: (model) => {
        return model && model.getData("tool_identifier") === "gitlab";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Project Name",
      id: "value",
      isRequired: true,
      minItems: 1,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.ARRAY,
    },
    {
      label: "Owner",
      id: "owner",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Account",
      id: "account",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Workspace",
      id: "tool_prop",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Workspace/Project",
      id: "tool_prop_name",
    },
    {
      label: "Active",
      id: "active",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Custom Tag Fields",
      id: "customTagFields",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.ARRAY,
    },
    {
      label: "Project Key",
      id: "projectKey",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Custom Fields Mapping",
      id: "customMappingFields",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.ARRAY,
    },
    {
      label: "Mono Repo",
      id: "isMonoRepo",
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    {
      label: "Mono Repo Path",
      id: "monoRepoPath",
    },
    {
      label: "Deployment Stage",
      id: "deploymentStage",
    },
  ],
  dbSupportedFieldNames: [
    "type",
    "owner",
    "account",
    "tool_identifier",
    "tool_id",
    "key",
    "keyPath",
    "value",
    "tool_prop",
    "active",
    "customTagFields",
    "projectKey",
    "customMappingFields",
    "isMonoRepo",
    "repoId",
    "monoRepoPath",
    "deploymentStage"
  ],
  newObjectFields: {
    type: "project",
    tool_identifier: "",
    tool_id: "",
    key: "",
    keyPath: "",
    value: [],
    tool_prop: "",
    active: true,
    customTagFields: [],
    projectKey: "",
    customMappingFields: [],
    repoId: "",
    monoRepoPath: "",
    isMonoRepo: false,
    deployementStage: ""
  },
};
module.exports = projectDataMappingMetadata;