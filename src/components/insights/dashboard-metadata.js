const dashboardMetadata = {
  idProperty: "_id",
  type: "Dashboard",
  fields: [
    {
      label: "Account",
      id: "account"
    },
    {
      label: "ID",
      id: "_id"
    },
    {
      label: "Created",
      id: "createdAt"
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Visibility",
      id: "visibility",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Description",
      id: "description"
    },
    {
      label: "Active",
      id: "active"
    },
    {
      label: "Favorite",
      id: "isFavorite"
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    visibility: "private",
    active: "active"
  }
};

export const dashboardTypes = [
  {type: "pipeline", value: "Pipeline"},
  {type: "planning", value: "Planning"},
  {type: "security", value: "Security"},
  {type: "quality", value: "Quality"},
  {type: "operations", value: "Operations"},
];

export const dashboardAccess = [
  {type: "private", value: "Private"},
  {type: "public", value: "My Organization"}
]

export default dashboardMetadata;