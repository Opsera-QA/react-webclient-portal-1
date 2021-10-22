import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import spinnakerStepFormMetadata from "./spinnaker-stepForm-metadata";
import SpinnakerStepSpinnakerToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/spinnaker/inputs/SpinnakerStepSpinnakerToolSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SpinnakerApplicationNameSelectInput
  from "components/common/list_of_values_input/tools/spinnaker/application/SpinnakerApplicationNameSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import SpinnakerPipelineSelectInput
  from "components/common/list_of_values_input/tools/spinnaker/tool/SpinnakerPipelineSelectInput";

function SpinnakerStepConfiguration({ stepTool, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [spinnakerStepModel, setSpinnakerStepModel] = useState(undefined);
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

    if (threshold != null) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    const newModel = modelHelpers.parseObjectIntoModel(configuration, spinnakerStepFormMetadata);
    setSpinnakerStepModel({...newModel});
  };

  const callbackFunction = async () => {
    const item = {
      configuration: spinnakerStepModel.getPersistData(),
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
      recordDto={spinnakerStepModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <SpinnakerStepSpinnakerToolSelectInput
        model={spinnakerStepModel}
        setModel={setSpinnakerStepModel}
      />
      <SpinnakerApplicationNameSelectInput
        model={spinnakerStepModel}
        setModel={setSpinnakerStepModel}
        spinnakerToolId={spinnakerStepModel?.getData("spinnakerId")}
        fieldName={"applicationName"}
      />
      <SpinnakerPipelineSelectInput
        fieldName={"pipelineName"}
        model={spinnakerStepModel}
        setModel={setSpinnakerStepModel}
        spinnakerToolId={spinnakerStepModel?.getData("spinnakerId")}
        spinnakerApplicationName={spinnakerStepModel?.getData("applicationName")}
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
