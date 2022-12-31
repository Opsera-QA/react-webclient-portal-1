import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
function OctopusCustomDeploymentDirectoryPurgeDetailsInput({ dataObject, setDataObject, fieldName, disabled }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const setDataFunction = () => {
    let newDataObject = dataObject;
    let flag = !dataObject.getData("purge");
    newDataObject.setData("purge", flag);
    newDataObject.setData("excludeFromPurge", "");
    setDataObject({ ...newDataObject });
  };  

  const getPurgeInputs = () => {
    if (!dataObject.getData("purge")) {
      return null;
    }
    return (
      <>
        <TextAreaInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          fieldName={"excludeFromPurge"}
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
      {getPurgeInputs()}
    </>
  );
}

OctopusCustomDeploymentDirectoryPurgeDetailsInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusCustomDeploymentDirectoryPurgeDetailsInput;
