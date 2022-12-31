import {
  apigeeRunParameterConfigurationMetadata
} from "components/workflow/run_assistants/apigee/configuration_selection_screen/apigeeRunParameterConfiguration.metadata";

export const apigeeRunParametersMetadata = {
  type: "Apigee Run Parameters",
  fields: [
    {
      label: "Selected Migration Objects",
      id: "selectedMigrationObjects",
    },
    {
      label: "Selected Configuration",
      id: "selectedConfigurationIndex",
    },
    {
      label: "Configurations",
      id: "configurations",
    },
    {
      label: "Record ID",
      id: "recordId",
    },
    {
      label: "Pipeline ID",
      id: "pipelineId",
    },
    {
      label: "Apigee Pipeline Step ID",
      id: "stepId",
    },
    {
      label: "Apigee Tool ID",
      id: "toolId",
    },
  ],
  newObjectFields: {
    selectedMigrationObjects: [],
    selectedConfigurationIndex: 0,
    configurations: [
      {...apigeeRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 1"},
      {...apigeeRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 2"},
      {...apigeeRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 3"},
    ],
    recordId: "",
    pipelineId: "",
    stepId: "",
    toolId: "",
  }
};