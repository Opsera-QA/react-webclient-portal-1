// TODO: Refine when all necessary fields are known
const pipelineSummaryMetadata = {
  idProperty: "_id",
  detailView: function(record) {
    return `/workflow/details/${record.getData("_id")}/summary`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Run Count",
      id: "run_count",
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
      label: "Description",
      id: "description",
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
      label: "External Reference",
      id: "external_reference",
      // fields: ["name", "description", "identifier"],
    },
    {
      label: "Status",
      id: "active",
    },
    {
      label: "Roles",
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
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "Status",
      id: "workflow",
    },
    {
      label: "Last Run",
      id: "workflow.last_run.completed",
    },
    {
      label: "Associated Pipeline Run",
      id: "runNumber",
    },
  ]
};

export default pipelineSummaryMetadata;