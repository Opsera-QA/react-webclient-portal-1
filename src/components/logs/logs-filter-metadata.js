const logsFilterMetadata = {
  idProperty: "_id",
  type: "Logs Filter",
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
    pageSize: 10,
    currentPage: 1,
    sortOption: {text: "Sort: Name", value: "name"},
    search: "",
    type: "",
    source: "public",
    persona: "",
    status: {text: "Status: Active", value: "active"},
    activeFilters: []
  }
};

export default logsFilterMetadata;