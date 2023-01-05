const tagsUsedInPipelineMetadata = {
  idProperty: "tags",
  type: "Tag",
  detailView: function (record) {
    return `/settings/tags/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Selected Tags",
      id: "selectedTags",
    },
    {
      label: "",
      id: "activeTab",
    },
  ],
  newObjectFields: {
    tags: [],
    selectedTags: [],
    activeTab: "all tags",
  },
};

export default tagsUsedInPipelineMetadata;