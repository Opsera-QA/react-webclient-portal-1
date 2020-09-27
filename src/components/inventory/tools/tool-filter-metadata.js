const toolFilterMetadata = {
  idProperty: "_id",
  type: "Tool Filter",
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
  ],
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    sortOption: { name: "createdAt", text: "Newest", order: -1 },
  }
};

export default toolFilterMetadata;