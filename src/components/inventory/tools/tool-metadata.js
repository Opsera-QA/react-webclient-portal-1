import regexDefinitions from "utils/regexDefinitions";

// TODO: This shouldn't be used anymore, use the new route and pull from Node.
//  It's only left in for backwards compatibility until I have time to update all references
const toolMetadata = {
  idProperty: "_id",
  type: "Tool",
  activeField: "active",
  detailView: function (record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Tool Details [${record?.getOriginalValue("name")}]`;
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
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, slashes, dashes, colons, underscores, and periods"
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Role Access Level",
      id: "role_access_level",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Description can be up to 1000 characters and can consist of letters, apostrophes, numbers, spaces, slashes, dashes, colons, underscores, and periods"
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
      inputMaskRegex: regexDefinitions.generalText?.regex,
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
      formText: `
        If no value is specified, the Opsera Default Hashicorp Vault is used. 
        To resume using the Opsera Default Hashicorp Vault after a value is set, please use the clear value button.
      `
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