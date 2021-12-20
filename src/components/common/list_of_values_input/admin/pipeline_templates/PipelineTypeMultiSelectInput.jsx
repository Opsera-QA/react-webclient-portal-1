import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import pipelineHelpers from "components/workflow/pipelineHelpers";

function PipelineTypeMultiSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={pipelineHelpers.PIPELINE_TYPES_}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

PipelineTypeMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineTypeMultiSelectInput.defaultProps = {
  fieldName: "type"
};

export default PipelineTypeMultiSelectInput;