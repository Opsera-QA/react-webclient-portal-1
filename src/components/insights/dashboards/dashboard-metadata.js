import regexHelpers from "utils/regexHelpers";

const dashboardMetadata = {
  idProperty: "_id",
  type: "Dashboard",
  activeField: "active",
  detailView: function (record) {
    return `/insights/dashboards/${record?.getData("_id")}/viewer`;
  },
  detailViewTitle: function (record) {
    return `Dashboard Details [${record?.getData("name")}]`;
  },
  fields: [
    {
      label: "Account",
      id: "account"
    },
    {
      label: "ID",
      id: "_id"
    },
    {
      label: "Created",
      id: "createdAt"
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Attributes",
      id: "attributes",
    },
    {
      label: "Visibility",
      id: "visibility",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
      maxLength: 255
    },
    {
      label: "Active",
      id: "active"
    },
    {
      label: "Favorite",
      id: "isFavorite"
    },
    {
      label: "Configuration",
      id: "configuration"
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    visibility: "private",
    type: "",
    active: true,
    tags: [],
    configuration: [],
    attributes: {}
  }
};

export const dashboardAttributesMetadata = {
  type: "Dashboard Attributes",
  fields: [
    {
      label: "Persona",
      id: "persona"
    }
  ],
  newObjectFields: {
    persona: ""
  }
};

export default dashboardMetadata;