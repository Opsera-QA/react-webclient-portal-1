export const apigeeRunParameterConfigurationMetadata = {
  type: "Apigee Run Parameters",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Asset Types",
      id: "assetType",
    },
    {
      label: "KVM Environments",
      id: "kvmEnvironment",
    },
    {
      label: "Name pattern match regex - (* - any character, _ - single character)",
      id: "namePattern",
      regexDefinitionName: "apigeeNamePatternRules",
      maxLength: 24,
    },
  ],
  newObjectFields: {
    name: "",
    assetType: [],
    kvmEnvironment: [],
    namePattern: "",
  }
};