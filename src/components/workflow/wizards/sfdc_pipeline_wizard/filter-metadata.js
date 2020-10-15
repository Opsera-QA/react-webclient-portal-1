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
    pageSize: 50,
    currentPage: 1,
    classFilter: "",
    search: ""
  }
};

export default filterMetadata;