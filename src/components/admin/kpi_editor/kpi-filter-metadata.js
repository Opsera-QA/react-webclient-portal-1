const kpiFilterMetadata = {
  idProperty: "_id",
  type: "Kpi",
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
      activeFilters.push({ filterId: "status", ...filterDto.getData("status") });
    }

    if (filterDto.getData("type") != null) {
      activeFilters.push({ filterId: "type", ...filterDto.getData("type") });
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({ filterId: "search", text: `Keywords: ${filterDto.getData("search")}` });
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: { text: "Sort: Newest", value: "newest" },
    search: "",
    activeFilters: [],
  },
  sortOptions: [
    { text: "Oldest", option: "oldest" },
    { text: "Newest", option: "newest" },
    { text: "Last Updated", option: "lastupdated" },
  ],
};

export default kpiFilterMetadata;
