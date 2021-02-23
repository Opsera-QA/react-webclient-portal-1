import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

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
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("status") != null) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(filterDto.getFilterValue("status"))}`});
    }

    if (filterDto.getData("type") != null) {
      activeFilters.push({filterId: "type", ...filterDto.getData("type")});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
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