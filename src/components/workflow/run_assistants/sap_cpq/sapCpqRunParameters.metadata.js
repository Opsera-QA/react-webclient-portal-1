import {
  sapCpqRunParameterConfigurationMetadata,
} from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/sapCpqRunParameterConfiguration.metadata";

export const sapCpqRunParametersMetadata = {
  type: "SAP CPQ Run Parameters",
  fields: [
    {
      label: "Selected Modified Objects",
      id: "selectedFiles",
    },
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
      label: "Pipeline Step ID",
      id: "stepId",
    },
  ],
  newObjectFields: {
    selectedMigrationObjects: [],
    selectedFiles: [],
    selectedConfigurationIndex: 0,
    configurations: [
      {...sapCpqRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 1"},
      {...sapCpqRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 2"},
      {...sapCpqRunParameterConfigurationMetadata.newObjectFields, name: "Configuration 3"},
    ],
    recordId: "",
    pipelineId: "",
    stepId: "",
  }
};