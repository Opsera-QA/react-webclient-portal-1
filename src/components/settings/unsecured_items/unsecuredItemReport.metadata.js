export const unsecureItemsReportMetadata = {
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Type",
      id: "object_type",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Owner",
      id: "owner_email",
    },
    {
      label: "Created",
      id: "createdAt",
    },
  ],
  newObjectFields: {
    _id: "",
    type: "",
    name: "",
    owner: "",
    createdAt: "",
  },
};
