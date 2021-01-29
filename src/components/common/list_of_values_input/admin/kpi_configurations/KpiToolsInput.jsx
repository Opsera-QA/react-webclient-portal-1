import React from "react";
import PropTypes from "prop-types";
import PipelineUsageToolMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineUsageToolMultiSelectInput";

function KpiToolsInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <PipelineUsageToolMultiSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      disabled={disabled}
    />
  );
}

KpiToolsInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiToolsInput.defaultProps = {
  fieldName: "tools"
};

export default KpiToolsInput;