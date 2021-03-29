const departmentFilterMetadata = {
  idProperty: "_id",
  type: "Department",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tool Identifier",
      id: "toolIdentifier",
    },
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
      label: "Tag",
      id: "tag",
    },
    {
      label: "Search",
      id: "search",
    },
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: "name",
    search: "",
    activeFilters: []
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default departmentFilterMetadata;