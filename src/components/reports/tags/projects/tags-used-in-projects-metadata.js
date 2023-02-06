const tagsUsedInProjectsMetadata = {
  idProperty: "tags",
  type: "Tag",
  detailView: function(record) {
    return `/settings/tags/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
  ],
  newObjectFields: {
    tags: [],
  }
};

export default tagsUsedInProjectsMetadata;