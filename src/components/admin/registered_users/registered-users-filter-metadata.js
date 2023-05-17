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
      maxLength: 100,
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
    {text: "Newest", option: ""},
    {text: "Oldest", option: "oldest"},
    {text: "Last Name", option: "lastName"},
    {text: "Email", option: "email"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default registeredUsersFilterMetadata;