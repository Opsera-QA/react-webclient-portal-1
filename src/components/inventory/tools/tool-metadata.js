const toolMetadata = {
  idProperty: "_id",
  type: "Tool",
  detailView: function(record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Tool Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Account",
      id: "account",
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
      isRequired: true,
      formText: "This field also updates the Tool Type value."
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
      label: "Tags",
      id: "tags",
    },
    {
      label: "Cost Center",
      id: "costCenter",
    },
    {
      label: "Created",
      id: "createdAt",
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    tool_identifier: "",
    compliance: [],
    licensing: [],
    location: [],
    projects: [],
    contacts: [],
    applications: [],
    organization: [],
    external_reference: [],
    active: true,
    roles: [],
    configuration: {},
    status: "",
    tags: []
  }
};

export default toolMetadata;