import {capitalizeFirstLetter, hasStringValue} from "../../../common/helpers/string-helpers";

const projectDataMappingMetadata = {
  idProperty: "_id",
  type: "Project Mapping",
  activeField: "active",
  detailView: function (record) {
    return `/settings/data_mapping/projects/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record?.getData("key")} Project Data Mapping Tag`;
  },
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Tool",
      id: "tool_identifier",
      isRequired: true,
    },
    {
      label: "Tool Registry Entry",
      id: "tool_id",
      isRequired: true,
    },
    {
      label: "Mapping Key",
      id: "key",
      isRequired: true,
    },
    {
      label: "Project Name",
      id: "value",
      isRequired: true,
      minItems: 1,
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Workspace",
      id: "tool_prop",
    },
    {
      label: "Workspace/Project",
      id: "tool_prop_name",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Custom Tag Fields",
      id: "customTagFields",
    },
    {      
      id: "projectKey",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    },
    {
      label: "Sort Option",
      id: "sortOption",
    },
  ],
  getActiveFilters(filterModel) {
    const activeFilters = [];

    const status = filterModel.getData("tool_identifier");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "tool_identifier", text: `Tool_identifier: ${capitalizeFirstLetter(status)}`});
    }

    const type = filterModel?.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "active", text: `Active: ${capitalizeFirstLetter(type)}`});
    }

    const search = filterModel?.getData("search");

    if (hasStringValue(search) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    type: "project",
    tool_identifier: "",
    tool_id: "",
    key: "",
    value: [],
    tool_prop: "",
    customTagFields: [],
    projectKey: "",
    createdAt: "",
    active : true,
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: Type", value: "type"},
    search: "",
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Value", option: "value"},
    {text: "Type", option: "type"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default projectDataMappingMetadata;
