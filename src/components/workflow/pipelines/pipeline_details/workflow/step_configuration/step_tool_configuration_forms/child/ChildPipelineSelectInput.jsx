import React from "react";
import PropTypes from "prop-types";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";
import PipelineSummaryField from "components/common/fields/pipelines/PipelineSummaryField";

function ChildPipelineSelectInput({ visible, fieldName, model, setModel, disabled, currentPipelineId}) {
  const getDisabledProperty = () => {
    if (disabled === true) {
      return true;
    }

    if (currentPipelineId != null) {
      return [currentPipelineId];
    }
  };

  return (
    <div>
      <PipelineSelectInput
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        visible={visible}
        disabled={getDisabledProperty()}
      />
      <PipelineSummaryField
        fieldName={fieldName}
        model={model}
        pipelineId={model?.getData(fieldName)}
      />
    </div>
  );
}

ChildPipelineSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

export default ChildPipelineSelectInput;