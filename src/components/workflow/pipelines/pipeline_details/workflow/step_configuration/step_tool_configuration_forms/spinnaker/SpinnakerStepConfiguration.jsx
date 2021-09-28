import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import spinnakerStepFormMetadata from "./spinnaker-stepForm-metadata";
import Model from "core/data_model/model";
import SpinnakerStepSpinnakerToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/spinnaker/inputs/SpinnakerStepSpinnakerToolSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SpinnakerApplicationNameSelectInput
  from "components/common/list_of_values_input/tools/spinnaker/application/SpinnakerApplicationNameSelectInput";
import SpinnakerToolSelectInput
  from "components/common/list_of_values_input/tools/spinnaker/tool/SpinnakerToolSelectInput";

function SpinnakerStepConfiguration({ stepTool, parentCallback, closeEditorPanel }) {

  const [isLoading, setIsLoading] = useState(false);

  const [spinnakerStepConfigurationDto, setSpinnakerStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    const configuration = step?.configuration;
    const threshold = step?.threshold;

    if (configuration != null) {
      setSpinnakerStepConfigurationDataDto(new Model(configuration, spinnakerStepFormMetadata, false));

      if (threshold != null) {
        setThresholdType(threshold?.type);
        setThresholdValue(threshold?.value);
      }
    } else {
      setSpinnakerStepConfigurationDataDto(
        new Model({ ...spinnakerStepFormMetadata.newObjectFields }, spinnakerStepFormMetadata, false)
      );
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: spinnakerStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={spinnakerStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <SpinnakerStepSpinnakerToolSelectInput
        model={spinnakerStepConfigurationDto}
        setModel={setSpinnakerStepConfigurationDataDto}
      />
      <SpinnakerApplicationNameSelectInput
        model={spinnakerStepConfigurationDto}
        setModel={setSpinnakerStepConfigurationDataDto}
        spinnakerToolId={spinnakerStepConfigurationDto?.getData("spinnakerId")}
        fieldName={"applicationName"}
      />
      <SpinnakerToolSelectInput
        fieldName={"pipelineName"}
        model={spinnakerStepConfigurationDto}
        setModel={setSpinnakerStepConfigurationDataDto}
        spinnakerToolId={spinnakerStepConfigurationDto?.getData("spinnakerId")}
        spinnakerApplicationName={spinnakerStepConfigurationDto?.getData("applicationName")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

SpinnakerStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default SpinnakerStepConfiguration;
