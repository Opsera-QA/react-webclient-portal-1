const toolUsedInPipelineMetadata = {
  idProperty: "_id",
  type: "Tool",
  detailView: function(record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "Tool",
      id: "_id",
    },
  ],
  newObjectFields: {
    _id: "",
  }
};

export default toolUsedInPipelineMetadata;