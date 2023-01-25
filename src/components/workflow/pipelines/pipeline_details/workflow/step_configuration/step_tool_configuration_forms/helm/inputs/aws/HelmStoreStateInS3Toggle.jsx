import React, { useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function HelmStoreStateInS3Toggle({ model, setModel, fieldName, disabled }) {
  const field = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setData("bucketName", "");
    newModel.setData("bucketRegion", "");
    if(value){
      newModel.getFieldById("bucketName").isRequired = true;
      newModel.getFieldById("bucketRegion").isRequired = true;
    }else {
      newModel.getFieldById("bucketName").isRequired = false;
      newModel.getFieldById("bucketRegion").isRequired = false;
    }
    setModel({...newModel});
  };

  return (
      <BooleanToggleInput disabled={disabled} fieldName={field.id}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />
  );
}

HelmStoreStateInS3Toggle.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

export default HelmStoreStateInS3Toggle;
