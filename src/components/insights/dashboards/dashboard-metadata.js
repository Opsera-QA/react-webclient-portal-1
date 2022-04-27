import {capitalizeFirstLetter} from "../../common/helpers/string-helpers";

const dashboardMetadata = {
  idProperty: "_id",
  type: "Dashboard",
  activeField: "active",
  detailView: function (record) {
    return `/insights/dashboards/${record?.getData("_id")}/viewer`;
  },
  detailViewTitle: function (record) {
    return ` ${capitalizeFirstLetter(record?.getOriginalValue("name"))}`;
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
      label: "Last Update",
      id: "updatedAt"
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
      label: "Organizations",
      id: "organizations",
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
    },
    {
      label: "Filters",
      id: "filters"
    },
    {
      label: "Roles",
      id: "roles"
    },
    {
      label: "Owner",
      id: "owner"
    },
    {
      label: "Owner",
      id: "owner_name"
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    visibility: "private",
    type: "",
    active: true,
    isFavorite: false,
    tags: [],
    configuration: [],
    attributes: {},
    filters: [],
    roles: [],
    owner: "",
    owner_name: "",
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

export const dashboardFiltersMetadata = {
  type: "Dashboard Tags Filter",
  fields: [
    {
      label: "Tags",
      id: "value"
    },
    {
      label: "Organizations",
      id: "organizations"
    },
    {
      label: "Date",
      id: "date"
    }
  ],
  newObjectFields: {
    value: [],
    organizations: [],
    date: {
      startDate: null,
      endDate: null,
      key: "selection",
    }
  },
};

export default dashboardMetadata;