const genericChartFilterMetadata = {
  idProperty: "_id",
  type: "Chart Filter Metadata",
  fields: [
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    }
  ],
  newObjectFields: {
    pageSize: 5,
    currentPage: 1
  }
};

export default genericChartFilterMetadata;