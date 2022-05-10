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
      label: "Filters",
      id: "amexFilters",
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
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, slashes, dashes, colons, underscores, and periods"

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
      id: "tags"
    },
    {
      label: "Organizations",
      id: "organizations"
    },
    {
      label: "Filters",
      id: "amexFilters",
    },
    {
      label: "Date",
      id: "date"
    }
  ],
  newObjectFields: {
    tags: [],
    organizations: [],
    amexFilters: {},
    date: {
      startDate: null,
      endDate: null,
      key: "selection",
    }
  },
};

export default dashboardMetadata;
