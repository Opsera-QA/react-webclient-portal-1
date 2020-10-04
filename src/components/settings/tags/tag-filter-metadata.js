const tagFilterMetadata = {
  idProperty: "_id",
  type: "Tag Filter",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tag Type",
      id: "type",
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
      label: "Search",
      id: "search",
    },
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: "type"
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Value", option: "value"},
    {text: "Key", option: "key"},
    {text: "Type", option: "type"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default tagFilterMetadata;