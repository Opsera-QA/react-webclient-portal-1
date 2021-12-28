import {
  informaticaRunParameterConfigurationMetadata,
} from "components/workflow/run_assistants/informatica/configuration_selection_screen/informaticaRunParameterConfiguration.metadata";

export const informaticaRunParametersMetadata = {
  type: "Informatica Run Parameters",
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
      label: "Informatica Pipeline Step ID",
      id: "stepId",
    },
  ],
  newObjectFields: {
    selectedMigrationObjects: [],
    selectedConfigurationIndex: 0,
    configurations: [
      {...informaticaRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 1"},
      {...informaticaRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 2"},
      {...informaticaRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 3"},
    ],
    recordId: "",
    pipelineId: "",
    stepId: "",
  }
};