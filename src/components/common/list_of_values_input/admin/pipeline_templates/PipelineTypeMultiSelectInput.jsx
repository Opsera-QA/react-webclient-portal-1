import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {PIPELINE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/pipelines/types/pipeline.types";

function PipelineTypeMultiSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
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