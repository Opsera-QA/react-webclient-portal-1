import React, { useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function TerraformStoreStateInS3Toggle({ dataObject, setDataObject, fieldName, disabled }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  const setDataFunction = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value);
    newDataObject.setData("bucketName", "");
    newDataObject.setData("bucketRegion", "");
    if(value){
      newDataObject.getFieldById("bucketName").isRequired = true;
      newDataObject.getFieldById("bucketRegion").isRequired = true;
    }else {
      newDataObject.getFieldById("bucketName").isRequired = false;
      newDataObject.getFieldById("bucketRegion").isRequired = false;
    }
    setDataObject({...newDataObject});
  };

  return (
    <>
      <BooleanToggleInput disabled={disabled} fieldName={field.id}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
      />
    </>
  );
}

TerraformStoreStateInS3Toggle.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

export default TerraformStoreStateInS3Toggle;