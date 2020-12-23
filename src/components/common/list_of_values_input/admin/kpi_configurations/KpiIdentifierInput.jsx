import React from "react";
import PropTypes from "prop-types";
import ToolMultiSelectInput from "../../inventory/ToolMultiSelectInput";

// TODO: Delete, this was unused and unnecessary
function KpiIdentifierInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <ToolMultiSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      disabled={disabled}
      valueField={"identifier"}
    />
  );
}

KpiIdentifierInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiIdentifierInput.defaultProps = {
  fieldName: "identifier"
};

export default KpiIdentifierInput;