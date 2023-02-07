// TODO: Refine when all necessary fields are known
const projectSummaryMetadata = {
  idProperty: "_id",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "key",
      isRequired: true
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Tool Type",
      id: "tool_identifier",
    },
    {
      label: "Tags",
      id: "value",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
  ]
};

export default projectSummaryMetadata;