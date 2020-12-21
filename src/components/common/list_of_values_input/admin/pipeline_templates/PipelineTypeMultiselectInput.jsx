import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "../../../inputs/MultiSelectInputBase";
import pipelineHelpers from "../../../../workflow/pipelineHelpers";

function PipelineTypeMultiselectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={pipelineHelpers.PIPELINE_TYPES_}
      valueField="id"
      textField="name"
      disabled={disabled}
    />
  );
}

PipelineTypeMultiselectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineTypeMultiselectInput.defaultProps = {
  fieldName: "type"
};

export default PipelineTypeMultiselectInput;