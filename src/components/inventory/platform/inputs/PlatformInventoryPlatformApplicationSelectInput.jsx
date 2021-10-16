import React from 'react';
import PropTypes from 'prop-types';
import PlatformApplicationSelectInput from "components/common/list_of_values_input/platform/PlatformApplicationSelectInput";

function PlatformInventoryPlatformApplicationSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("applicationId", selectedOption?._id, "");
    newDataObject.setData("toolsList", selectedOption?.tools, []);
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setDefaultValue("applicationId");
    newDataObject.setDefaultValue("toolsList");
    setModel({...newDataObject});
  };

  return (
    <PlatformApplicationSelectInput
      fieldName={"applicationId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      filterOldPipelineApplications={true}
    />
  );
}

PlatformInventoryPlatformApplicationSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PlatformInventoryPlatformApplicationSelectInput;

