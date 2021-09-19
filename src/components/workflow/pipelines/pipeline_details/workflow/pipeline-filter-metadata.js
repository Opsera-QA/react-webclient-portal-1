const pipelineFilterMetadata = {
  idProperty: "_id",
  type: "Pipeline",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tag",
      id: "tag",
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
      label: "Pipeline Owner",
      id: "owner"
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
      label: "View Type",
      id: "viewType",
    },
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("tag") != null) {
      const tag = filterDto.getData("tag");
      activeFilters.push({filterId: "tag", text: `Tag: ${tag?.value}`});
    }

    if (filterDto.getData("owner") != null) {
      activeFilters.push({filterId: "owner", ...filterDto.getData("owner")});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keyword: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    sortOption: { value: "name", text: "Sort: Pipeline Name (A-Za-z)", order: 1 },
    search: "",
    viewType: "cards",
    activeFilters: []
  },
  sortOptions: [
    { option: "createdAt", text: "Newest Pipelines", order: -1 },
    { option: "createdAt", text: "Oldest Pipelines", order: 1 },
    { option: "name", text: "Pipeline Name (A-Za-z)", order: 1 },
    { option: "name", text: "Pipeline Name (z-aZ-A)", order: -1 },
    { option: "updatedAt", text: "Updated (latest)", order: -1 },
    { option: "updatedAt", text: "Updated (earliest)", order: 1 },
  ]
};

export default pipelineFilterMetadata;