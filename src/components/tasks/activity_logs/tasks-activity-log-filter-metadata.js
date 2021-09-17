import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const tasksActivityLogFilterMetadata = {
  idProperty: "_id",
  type: "Tasks Activity Log",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Type",
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
      label: "Tag",
      id: "tag",
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

    if (filterDto.getData("tag") != null) {
      const tag = filterDto.getData("tag");
      activeFilters.push({filterId: "tag", text: `Tag: ${tag?.value}`});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Newest", option: "newest"},
    search: "",
    activeFilters: []
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default tasksActivityLogFilterMetadata;