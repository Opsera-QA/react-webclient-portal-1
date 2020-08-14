const platformMetadata = {
  idProperty: "_id",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Configuration Name",
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
      label: "Tool",
      id: "tool_identifier",
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
    },
    {
      label: "Compliance",
      id: "compliance",
      // fields: ["name", "value"],
    },
    {
      label: "Licensing",
      id: "licensing",
      // fields: ["name", "value"],
    },
    {
      label: "Location",
      id: "location",
      type: "multi",
      // fields: ["name", "value"],
    },
    {
      label: "Project",
      id: "projects",
      // fields: ["name", "value"],
    },
    {
      label: "Contacts",
      id: "contacts",
      // fields: ["name", "email", "user_id"],
    },
    {
      label: "Application",
      id: "applications",
      // fields: ["name", "value"],
    },
    {
      label: "Organization",
      id: "organization",
      // fields: ["name", "value"],
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
      label: "Created",
      id: "createdAt",
    }
  ]
};

export default toolMetadata;