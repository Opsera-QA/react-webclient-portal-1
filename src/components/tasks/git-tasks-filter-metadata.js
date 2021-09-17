const gitTasksFilterMetadata = {
  idProperty: "_id",
  type: "Task",
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
      label: "Owner",
      id: "owner",
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
      activeFilters.push({filterId: "status", ...filterDto.getData("status")});
    }

    if (filterDto.getData("type") != null) {
      activeFilters.push({filterId: "type", text: `Type: ${filterDto.getFilterText("type")}`});
    }

    if (filterDto.getData("tag") != null) {
      activeFilters.push({filterId: "tag", ...filterDto.getData("tag")});
    }

    if (filterDto.getData("owner") != null) {
      activeFilters.push({filterId: "owner", text: `Owner: ${filterDto.getFilterText("owner")}`});
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
    activeFilters: [],
    viewType: "list",
    category: "",
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default gitTasksFilterMetadata;