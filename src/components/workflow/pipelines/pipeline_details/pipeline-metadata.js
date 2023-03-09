import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const pipelineMetadata = {
  idProperty: "_id",
  type: "Pipeline",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      minLength: 3,
      maxLength: 50,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Run Count",
      id: "run_count",
    },
    {
      label: "Run Count",
      id: "workflow.run_count",
    },
    {
      label: "Role Access Level",
      id: "role_access_level",
    },
    {
      label: "Last Run",
      id: "last_run",
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Notes",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "descriptionField",
      formText: "Notes can be up to 1000 characters and can consist of letters, apostrophes, numbers, spaces, slashes, dashes, colons, exclamation points, commas, underscores, and periods",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Tool Identifier",
      id: "tool_identifier",
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
    },
    {
      label: "Compliance",
      id: "compliance",
    },
    {
      label: "Licensing",
      id: "licensing",
    },
    {
      label: "Location",
      id: "location",
      type: "multi",
    },
    {
      label: "Project",
      id: "projects",
    },
    {
      label: "Contacts",
      id: "contacts",
    },
    {
      label: "Application",
      id: "applications",
    },
    {
      label: "Organization",
      id: "organization",
    },
    {
      label: "Organization",
      id: "organizationName",
    },
    {
      label: "External Reference",
      id: "external_reference",
      // fields: ["name", "description", "identifier"],
    },
    {
      label: "Status",
      id: "active",
    },
    {
      label: "Access Rules",
      id: "roles",
    },
    {
      label: "Configuration",
      id: "configuration",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "State",
      id: "state",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Created On",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "Status",
      id: "workflow.last_run",
    },
    {
      label: "Last Run",
      id: "workflow.last_run.completed",
    },
    {
      label: "Schedule",
      id: "schedule"
    },
  ],
  // newObjectFields: {
  //   "workflow.run_count": 0,
  // }
};

export default pipelineMetadata;