export const platformSettingFeatureMetadata = {
  type: "Platform Setting Feature",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
      isRequired: true,
      lowercase: true,
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Parameters",
      id: "params",
    },
  ],
  newObjectFields: {
    name: "",
    params: {},
    active: true,
  }
};