import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const tagFilterMetadata = {
  idProperty: "_id",
  type: "Tag",
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
      label: "Created At",
      id: "createdAt",
    },
  ],
  getActiveFilters(filterModel) {
    const activeFilters = [];

    const status = filterModel.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const type = filterModel?.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "type", text: `Type: ${capitalizeFirstLetter(type)}`});
    }

    const tool_identifier = filterModel?.getData("tool_identifier");

    if (hasStringValue(tool_identifier) === true) {
      activeFilters.push({filterId: "tool_identifier", text: `Tool_identifier: ${capitalizeFirstLetter(type)}`});
    }

    const search = filterModel?.getData("search");

    if (hasStringValue(search) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
    }

    return activeFilters;
  },
  newObjectFields: {
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

export default tagFilterMetadata;