export const commandLineInputParameterMetadata = {
  type: "Input Parameter Metadata",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Name",
      id: "name",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "local";
      },
      regexDefinitionName: "localVariableName",
      maxLength: 50,
    },
    {
      label: "Value",
      id: "value",
      regexDefinitionName: "localVariableValue",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "local";
      },
      maxLength: 8000,
    },
    {
      label: "Parameter Name",
      id: "parameterName",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "global";
      },
    },
    {
      label: "Parameter ID",
      id: "parameterId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "global";
      },
    },
    {
      label: "Output Key",
      id: "outputKey",
    },
  ],
  newObjectFields: {
    type: "local",
    name: "opsera-local-",
    parameterId: "",
    parameterName: "",
    outputKey: "",
    value: "",
  },
};
