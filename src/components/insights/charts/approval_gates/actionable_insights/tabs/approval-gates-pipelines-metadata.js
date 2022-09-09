const approvalGatesPipelinesMetadata = {
    idProperty: "_id",
    type: "List of Pipelines",
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
        }
    ],
    newObjectFields: {
        pageSize: 5,
        currentPage: 1,
        sortOption: {text: "Newest", value: "newest"},
        search: "",
    },
    sortOptions: [
      {text: "Newest", option: "newest"},
      {text: "Oldest", option: "oldest"}

    ]
  };

  export default approvalGatesPipelinesMetadata;