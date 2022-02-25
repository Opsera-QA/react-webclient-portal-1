export const informaticaRunParameterConfigurationMetadata = {
  type: "Informatica Run Parameters",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Types",
      id: "types",
    },
    {
      label: "Location",
      id: "location",
      regexDefinitionName: "informaticaLocationRules",
    },
    {
      label: "Update By",
      id: "updateBy",
      regexDefinitionName: "email",
      maxLength: 1000,
    },
    {
      label: "Tag",
      id: "tag",
    },
    {
      label: "Update Time",
      id: "updateTime",
    },
  ],
  newObjectFields: {
    name: "",
    types: [],
    updateBy: "",
    tag: "",
    location: "",
    updateTime: undefined,
  }
};