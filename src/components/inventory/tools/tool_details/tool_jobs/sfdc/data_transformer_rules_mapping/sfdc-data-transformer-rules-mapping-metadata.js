const sfdcDataTransformerRulesMapMetadata = {
  type: "SFDC Data Transformer Rules",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
    },
    {
      label: "Operation",
      id: "operation",
      isRequired: true,
    },
    {
      label: "Component Type",
      id: "componentType",
      isRequired: true,
    },
    {
      label: "Component Name",
      id: "componentName",
      isRequired: true,
    },
    {
      label: "Tag Name",
      id: "tagName"
    },
    {
      label: "Tag Filters",
      id: "tagFilter",
      maxItems: 50,
    },
    {
      label: "Search Text",
      id: "searchText",
      isRequiredFunction: (model) => {
        return model?.getData("operation") === "search_and_replace";
      },
    },
    {
      label: "Replace Text",
      id: "replaceText",
      isRequiredFunction: (model) => {
        return model?.getData("operation") === "search_and_replace";
      },
    },
    {
      id: "isXml"
    },
  ],
  newObjectFields: {
    name: "",
    operation: "",
    componentType: "",
    componentName: "",
    tagName: "",
    tagFilter: [],
    searchText: "",
    replaceText: "",
    isXml: false,
  },
};

export default sfdcDataTransformerRulesMapMetadata;
