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
    selectedMigrationObjects: [
      {...informaticaRunParameterConfigurationMetadata.newObjectFields},
      {...informaticaRunParameterConfigurationMetadata.newObjectFields},
      {...informaticaRunParameterConfigurationMetadata.newObjectFields},
    ],
    selectedConfigurationIndex: 0,
    configurations: [],
    recordId: "",
    pipelineId: "",
    stepId: "",
  }
};