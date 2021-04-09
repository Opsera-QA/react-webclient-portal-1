import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const organizationFilterMetadata = {
  idProperty: "_id",
  type: "Organization",
  fields: [
    {
      label: "Status",
      id: "status",
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

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: Name", value: "name"},
    search: "",
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default organizationFilterMetadata;