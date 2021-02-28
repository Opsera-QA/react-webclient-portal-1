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
      label: "Source",
      id: "source",
    },
    {
      label: "Persona",
      id: "persona",
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
      activeFilters.push({filterId: "persona", text: `Persona: ${filterDto.getData("persona")}`});
    }
    
    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 10,
    currentPage: 1,
    sort: "name",
    search: "",
    source: "",
    persona: "",
    status: {text: "Status: Active", value: "active"},
    activeFilters: []
  }
};

export default dashboardTemplateFilterMetadata;