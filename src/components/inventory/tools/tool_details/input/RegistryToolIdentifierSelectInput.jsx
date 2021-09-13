import React from "react";
import PropTypes from "prop-types";
import ToolIdentifierSelectInput from "components/common/list_of_values_input/admin/tools/ToolIdentifierSelectInput";

function RegistryToolIdentifierSelectInput({ dataObject, setDataObject, fieldName, disabled}) {
  const validateAndSetData = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, selectedOption?.identifier);
    newDataObject.setData("tool_type_identifier", selectedOption?.tool_type_identifier);
    newDataObject.setData("configuration", {});
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = dataObject;
    newDataObject.setDefaultValue(fieldName);
    newDataObject.setDefaultValue("tool_type_identifier");
    newDataObject.setDefaultValue("configuration");
    setDataObject({...newDataObject});
  };

  const getClearDataDetails = () => {
    return (
      <div className={"my-2"}>
        This also includes clearing out the tool connection settings.
      </div>
    );
  };

  return (
    <ToolIdentifierSelectInput
      dataObject={dataObject}
      setDataObject={setDataObject}
      status={"active"}
      fieldName={fieldName}
      setDataFunction={validateAndSetData}
      clearDataFunction={clearDataFunction}
      clearDataDetails={getClearDataDetails()}
      disabled={
        disabled || (!dataObject?.isNew() && dataObject.getData(fieldName) !== "" && !dataObject.isChanged(fieldName))
      }
    />
  );
}

RegistryToolIdentifierSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

RegistryToolIdentifierSelectInput.defaultProps = {
  fieldName: "tool_identifier",
};

export default RegistryToolIdentifierSelectInput;