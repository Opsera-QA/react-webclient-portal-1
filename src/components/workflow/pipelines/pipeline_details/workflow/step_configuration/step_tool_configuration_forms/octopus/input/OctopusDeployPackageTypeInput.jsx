import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function OctopusDeployPackageTypeInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const setDataFunction = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("deployedPackageFileName", "");
    setDataObject({...newDataObject});
  };

  const getPackageFileNameInput = () => {
    if(dataObject.getData("deployExtractedPackage")){
        return null;
    }
    return (
      <TextInputBase
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={"deployedPackageFileName"}        
      />
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
      {getPackageFileNameInput()}
    </>
  );
}

OctopusDeployPackageTypeInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusDeployPackageTypeInput;
