import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function OctopusSpecifyDepVarsToggle({dataObject, setDataObject, fieldName, disabled}) {

  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("deploymentVariables", []);
    newDataObject.setData("customParameters", []);
    newDataObject.setData("structuredConfigVariablesPath", "");
    newDataObject.setData("xmlConfigTransformVariableValue", "");
    setDataObject({...newDataObject});
  };

  return (
    <BooleanToggleInput 
      disabled={disabled}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
    />    
  );
}

OctopusSpecifyDepVarsToggle.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusSpecifyDepVarsToggle;