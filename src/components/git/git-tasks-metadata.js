import regexHelpers from "utils/regexHelpers";

const gitTasksMetadata = {
  idProperty: "_id",
  type: "Task",
  activeField: "active",
  detailView: function(record) {
    return `/task/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Task Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 25,
      regexValidator: regexHelpers.regexTypes.limitedTextWithSpaces
    },
    {
      label: "Description",
      id: "description",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Role Access Level",
      id: "role_access_level",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.generalText
    },
    {
      label: "Tool",
      id: "tool_identifier",
      maxLength: 10,
      regexValidator: regexHelpers.regexTypes.generalText
    },
    {
      label: "Active",
      id: "active",
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
      label: "LDAP Account",
      id: "account",
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.generalText
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Access Rules",
      id: "roles",
    },
    {
      label: "Jenkins List",
      id: "jenkinsIds",
    }, 
  ],
  newObjectFields: {
    name: "",
    description: "",
    type: "",
    tool_identifier: "",
    active: true,
    configuration: {},
    status: "",
    tags: [],
    roles: [],
    account: "",
    jenkinsIds: []
  }
};

export default gitTasksMetadata;