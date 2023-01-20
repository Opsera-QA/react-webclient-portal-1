import React from "react";
import PropTypes from "prop-types";
import {PIPELINE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export default function PipelineTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

PipelineTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineTypeSelectInput.defaultProps = {
  fieldName: "type"
};