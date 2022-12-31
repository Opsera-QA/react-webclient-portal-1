const vanityTableFilterMetaData = {
    idProperty: "_id",
    type: "Chart Filter Metadata",
    getActiveFilters(filterDto) {
      let activeFilters = [];
  
      if (filterDto.getData("classFilter") != null) {
        activeFilters.push({ filterId: "classFilter", text: filterDto.getData("classFilter") });
      }
      if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
        activeFilters.push({ filterId: "search", text: `Keywords: ${filterDto.getData("search")}` });
      }
  
      return activeFilters;
    },
    fields: [
      {
        label: "Page Size",
        id: "pageSize",
      },
      {
        label: "Total Count",
        id: "totalCount",
      },
    ],
    newObjectFields: {
      pageSize: 150,
      currentPage: 1,
      checkAll: false,
      search: "",
      activeFilters: [],
    },
  };
  
  export default vanityTableFilterMetaData;
  