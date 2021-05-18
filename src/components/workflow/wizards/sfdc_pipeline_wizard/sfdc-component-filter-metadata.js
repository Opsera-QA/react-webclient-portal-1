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
        label: "Class Filter",
        id: "classFilter",
      },
      {
        label: "Check All",
        id: "checkAll",
      }
    ],
    getActiveFilters(filterDto) {
      
        let activeFilters = [];
    
        if (filterDto.getData("classFilter") != null) {
          activeFilters.push({filterId: "classFilter", text: filterDto.getData("classFilter")});
        }        
        if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
          activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
        }
                
        return activeFilters;
    },
    newObjectFields: {
      pageSize: 1500,
      currentPage: 1,
      // classFilter: "",
      checkAll: false,
      search: "",
      activeFilters: []
    }
  };
  
  export default sfdcComponentFilterMetadata;