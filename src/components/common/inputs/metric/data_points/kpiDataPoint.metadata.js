// TODO: Keep aligned with node's until we can separate out both into a library
const kpiDataPointMetadata = {
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
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Identifier",
      id: "identifier",
      lowercase: true,
      isRequired: true,
      regexDefinitionName: "nameField",
    },
    {
      label: "Custom Fields Mapping",
      id: "customFieldsMapping",
    },
    {
      label: "Strategic Criteria",
      id: "strategic_criteria",
    },
    {
      label: "Visibility",
      id: "visibility",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
  ],
  newObjectFields: {
    name: "",
    type: "",
    identifier: "",
    description: "",
    customFieldsMapping: {      
      enabled: false,
      useCustomFields: false,
      mappedFields: undefined,
    },
    strategic_criteria: {
      data_point_evaluation_rules: {},
      isUserEditable: false,
    },
    visibility: {
      userVisibilityToggleSupport: false,
      defaultNotificationToggle: false,
      sendDefaultCriteriaNotification: false,
      isVisible: true,
    }
  },
};

module.exports = kpiDataPointMetadata;
