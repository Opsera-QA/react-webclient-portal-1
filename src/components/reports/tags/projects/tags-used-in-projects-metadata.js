const tagsUsedInProjectsMetadata = {
  idProperty: "tags",
  type: "Tag",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Organization Tags",
      id: "orgTags",
    },
  ],
  newObjectFields: {
    tags: [],
    orgTags: []
  }
};

export default tagsUsedInProjectsMetadata;