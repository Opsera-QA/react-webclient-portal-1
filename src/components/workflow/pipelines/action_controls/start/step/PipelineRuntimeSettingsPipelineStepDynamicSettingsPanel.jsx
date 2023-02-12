import React, {useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import LocalInputParametersValueInputBase
  from "components/common/list_of_values_input/parameters/local/value/LocalInputParametersValueInputBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {
  pipelineStepRuntimeSettingsMetadata
} from "components/workflow/pipelines/action_controls/start/step/pipelineStepRuntimeSettings.metadata";

export default function PipelineRuntimeSettingsPipelineStepDynamicSettingsPanel(
  {
    pipelineStep,
    updateStepSettingsFunction,
  }) {
  const [pipelineStepRuntimeSettingsModel, setPipelineStepRuntimeSettingsModel] = useState(modelHelpers.parseObjectIntoModel(pipelineStep, pipelineStepRuntimeSettingsMetadata));

  const updateModelFunction = (newModel) => {
    setPipelineStepRuntimeSettingsModel({...newModel});
    updateStepSettingsFunction({...newModel?.getPersistData()});
  };

  if (pipelineStep == null || pipelineStepRuntimeSettingsModel == null) {
    return null;
  }

  return (
    <div className={"mt-2"}>
      <H5FieldSubHeader
        subheaderText={`${pipelineStepRuntimeSettingsModel?.getData("name")}: Runtime Settings`}
      />
      <div>
        <LocalInputParametersValueInputBase
          model={pipelineStepRuntimeSettingsModel}
          fieldName={"stepParameters"}
          setModel={updateModelFunction}
        />
      </div>
    </div>
  );
}

PipelineRuntimeSettingsPipelineStepDynamicSettingsPanel.propTypes = {
  pipelineStep: PropTypes.object,
  updateStepSettingsFunction: PropTypes.func,
};