const sonarPipelineFilterMetadata = {
  idProperty: "_id",
  type: "Sonar Chart Filter Metadata",
  fields: [
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

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 5,
    currentPage: 1,
    sortOption: {text: "Newest", value: ""},
    search: "",
    activeFilters: []
  },
  sortOptions: [
    {text: "Newest", option: ""},
    {text: "Oldest", option: "oldest"},
    {text: "Project Name", option: "projectName"},
    {text: "Pipeline Name", option: "pipelineName"},
    {text: "Language", option: "sonarPrimaryLanguage"}
  ]
};

export default sonarPipelineFilterMetadata;
