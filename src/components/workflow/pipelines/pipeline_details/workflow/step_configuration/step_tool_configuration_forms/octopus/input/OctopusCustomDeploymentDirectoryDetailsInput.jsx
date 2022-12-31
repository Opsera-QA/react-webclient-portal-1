import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import OctopusCustomDeploymentDirectoryPurgeDetailsInput from "./OctopusCustomDeploymentDirectoryPurgeDetailsInput";
function OctopusCustomDeploymentDirectoryDetailsInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const setDataFunction = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("deploymentDirectory", "");
    newDataObject.setData("purge", false);
    setDataObject({...newDataObject});
  };

  const getSupportingInputs = () => {
    if(!dataObject.getData(fieldName)){
        return null;
    }
    return (
      <>
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"deploymentDirectory"}        
        />        
        <OctopusCustomDeploymentDirectoryPurgeDetailsInput 
          dataObject={dataObject}
          setDataObject={setDataObject}
          fieldName={"purge"}
        />
      </>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <>      
      <BooleanToggleInput disabled={disabled} fieldName={field.id}
          dataObject={dataObject}
          setDataObject={setDataObject}
          setDataFunction={setDataFunction}
      />
      {getSupportingInputs()}
    </>
  );
}

OctopusCustomDeploymentDirectoryDetailsInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusCustomDeploymentDirectoryDetailsInput;
