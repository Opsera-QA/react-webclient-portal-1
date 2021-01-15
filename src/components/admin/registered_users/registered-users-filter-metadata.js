const registeredUsersFilterMetadata = {
  idProperty: "_id",
  type: "Registered Users Filter",
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
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Newest", value: ""},
    search: "",
    activeFilters: []
  },
  sortOptions: [
    {text: "Newest", value: ""},
    {text: "Oldest", value: "oldest"},
    {text: "Last Name", value: "lastName"},
    {text: "Email", value: "email"},
    {text: "Last Updated", value: "lastupdated"}
  ]
};

export default registeredUsersFilterMetadata;