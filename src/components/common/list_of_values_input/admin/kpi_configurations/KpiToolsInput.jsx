import React from "react";
import PropTypes from "prop-types";
import PipelineToolIdentifierMultiSelectInput from "../../workflow/pipelines/PipelineToolIdentifierMultiSelectInput";

function KpiToolsInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <PipelineToolIdentifierMultiSelectInput
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