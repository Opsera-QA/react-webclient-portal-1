import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";

const tagFilterMetadata = {
  idProperty: "_id",
  type: "Tag",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tag Type",
      id: "type",
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
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
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

    const search = filterModel?.getData(search);

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