export const createPipelineFromTemplateMetadata = {
  idProperty: "_id",
  type: "Pipeline Template",
  activeField: "active",
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      minLength: 3,
      maxLength: 50,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Notes",
      id: "description",
      minLength: 3,
      maxLength: 1000,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
  },
};