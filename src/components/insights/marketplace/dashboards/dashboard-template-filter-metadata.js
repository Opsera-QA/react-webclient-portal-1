const dashboardTemplateFilterMetadata = {
  idProperty: "_id",
  type: "Dashboard Template Filter",
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
      id: "sort",
    },
    {
      label: "Sort Option",
      id: "sortOption",
    },
    {
      label: "Source",
      id: "source",
    },
    {
      label: "Persona",
      id: "persona",
    },
    {
      label: "Dashboard Type",
      id: "type",
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

    if (filterDto.getData("persona") != null && filterDto.getData("persona") !== "") {
      activeFilters.push({filterId: "persona", text: `Persona: ${filterDto.getFilterValue("persona")}`});
    }

    if (filterDto.getData("type") != null && filterDto.getData("type") !== "") {
      activeFilters.push({filterId: "type", text: `Dashboard Type: ${filterDto.getFilterValue("type")}`});
    }
    
    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    sort: "name",
    search: "",
    type: "",
    source: "public",
    persona: "",
    sortOption: {text: "Sort: Name", value: "name"},
    status: {text: "Status: Active", value: "active"},
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Type", option: "type"},
  ]
};

export default dashboardTemplateFilterMetadata;