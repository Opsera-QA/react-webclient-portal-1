export const argoFiltersMetadata = {
  idProperty: "_id",
  type: "",
  fields: [
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    }
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];
    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({ filterId: "search", text: `Keywords: ${filterDto.getData("search")}` });
    }
    return activeFilters;
  },
  newObjectFields: {
    pageSize: 10,
    currentPage: 1,
    search: "",
    activeFilters: [],
  }
};

export default argoFiltersMetadata;
