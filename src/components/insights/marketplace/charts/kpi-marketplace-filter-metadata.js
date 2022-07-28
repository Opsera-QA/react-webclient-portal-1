const kpiMarketplaceFilterMetadata = {
  idProperty: "_id",
  type: "Kpi Marketplace Filter",
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
      label: "Tool",
      id: "tool",
    },
    {
      label: "Category",
      id: "category",
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

    if (filterDto.getData("tool") != null) {
      activeFilters.push({filterId: "tool", ...filterDto.getData("tool")});
    }
    
    if (filterDto.getData("category") != null) {
      activeFilters.push({filterId: "category", ...filterDto.getData("category")});
    }

    if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    search: "",
    sortOption: {text: "Sort: KPI Name (A-Z a-z)", value: "name"},
    status: {text: "Status: Active", value: "active"},
    activeFilters: []
  },
  sortOptions: [
    {text: "Oldest KPIs", option: "oldest"},
    {text: "Newest KPIs", option: "newest"},
    {text: "KPI Name (A-Z a-z)", option: "name"},
    {text: "KPI Name (z-a Z-A)", value: "name-descending"},
  ]
};

export default kpiMarketplaceFilterMetadata;