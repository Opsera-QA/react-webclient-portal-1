import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function AzureAcrPushNewRepoBooleanInput({dataObject, setDataObject, disabled}) {


  const setDataFunction = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value);
    newDataObject.setData('azureRepoName', '');
    setDataObject({...newDataObject});
  };

  return (
      <BooleanToggleInput
        fieldName={"newRepo"}
        dataObject={dataObject}       
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        disabled={disabled}
      />
  );
}

AzureAcrPushNewRepoBooleanInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureAcrPushNewRepoBooleanInput;