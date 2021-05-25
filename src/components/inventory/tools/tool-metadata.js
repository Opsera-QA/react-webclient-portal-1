import regexHelpers from "utils/regexHelpers";

const toolMetadata = {
  idProperty: "_id",
  type: "Tool",
  activeField: "active",
  detailView: function (record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Tool Details [${record?.name}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Tool Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes["generalTextWithSpaces"],
      formText: "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods"
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000, 
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Owner ID",
      id: "owner",
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
      label: "Locations",
      id: "location",
    },
    {
      label: "Classification",
      id: "classification",
    },
    {
      label: "Contacts",
      id: "contacts",
    },
    {
      label: "Applications",
      id: "applications",
    },
    {
      label: "Organizations",
      id: "organization",
    },
    {
      label: "External Reference",
      id: "external_reference",
    },
    {
      label: "Active",
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
      label: "Tags",
      id: "tags",
    },
    {
      label: "Cost Center",
      id: "costCenter",
      inputMaskRegex: regexHelpers.regexTypes["generalText"],
      maxLength: 25
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
      label: "Vault Instance",
      id: "vault",
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    tool_identifier: "",
    costCenter: "",
    compliance: [],
    licensing: [],
    location: [],
    classification: "",
    contacts: [],
    applications: [],
    organization: [],
    external_reference: [],
    active: true,
    roles: [],
    configuration: {},
    status: "",
    tags: [],
    vault: ""
  }
};

export default toolMetadata;