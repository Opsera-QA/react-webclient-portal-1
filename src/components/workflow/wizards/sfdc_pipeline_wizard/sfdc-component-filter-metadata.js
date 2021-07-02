const sfdcComponentFilterMetadata = {
  idProperty: "_id",
  type: "Sfdc Component Files",
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
      label: "Component Filter",
      id: "componentFilter",
    }
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("componentFilter") != null && filterDto.getData("componentFilter") !== "") {
      activeFilters.push({filterId: "componentFilter", text: `Component: ${filterDto.getData("componentFilter")}`});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 1500,
    currentPage: 1,
    componentFilter: "",
    search: "",
    activeFilters: []
  }
};

export default sfdcComponentFilterMetadata;