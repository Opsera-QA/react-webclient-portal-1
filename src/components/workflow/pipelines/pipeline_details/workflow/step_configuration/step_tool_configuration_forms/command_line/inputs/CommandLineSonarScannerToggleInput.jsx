import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function CommandLineSonarScannerToggleInput({dataObject, setDataObject, fieldName, disabled}) {

  console.log("inside CommandLineSonarScannerToggleInput");

  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    let sonarFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sonarFlag);    
    newDataObject.setData("sonarToolConfigId", "");
    newDataObject.setData("projectKey", "");
    newDataObject.setData("sonarScannerCommand", "");
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

CommandLineSonarScannerToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default CommandLineSonarScannerToggleInput;
