const filterMetadata = {
  idProperty: "_id",
  type: "Tool",
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
    pageSize: 100,
    currentPage: 1,
  }
};

export default filterMetadata;