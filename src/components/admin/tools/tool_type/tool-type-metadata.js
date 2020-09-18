const toolTypeMetadata = {
  idProperty: "_id",
  type: "Tool Type",
  fields: [
  {
    label: "Name",
    id: "name",
      isRequired: true
  },
  {
    label: "Description",
    id: "description",
  },
    {
      label: "ID",
      id: "_id",
    },
  {
    label: "Identifier",
    id: "identifier",
      isRequired: true
  },
  {
    label: "Tags",
    id: "tags",
  },
  {
    label: "Active",
    id: "active",
  },
    {
      label: "Created At",
      id: "createdAt",
    },
],
  newObjectFields: {
    "name": "",
    "description": "",
    "identifier": "",
    "tags": [],
    "active": true,
  }
};

export default toolTypeMetadata;