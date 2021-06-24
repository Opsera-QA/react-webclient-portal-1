import React from "react";
import PropTypes from "prop-types";
import ToolIdentifierSelectInput from "components/common/list_of_values_input/admin/tools/ToolIdentifierSelectInput";

function RegistryToolIdentifierSelectInput({ dataObject, setDataObject, disabled}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("tool_identifier", value.identifier);
    newDataObject.setData("tool_type_identifier", value.tool_type_identifier);
    newDataObject.setData("configuration", {});
    setDataObject({...newDataObject});
  };

  return (
    <ToolIdentifierSelectInput
      dataObject={dataObject}
      setDataObject={setDataObject}
      toolRegistryFilter={true}
      status={"active"}
      fieldName={"tool_identifier"}
      setDataFunction={validateAndSetData}
      disabled={disabled}
    />
  );
}

RegistryToolIdentifierSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};


export default RegistryToolIdentifierSelectInput;