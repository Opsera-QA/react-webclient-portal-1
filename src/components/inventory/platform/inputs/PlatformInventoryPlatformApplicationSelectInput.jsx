import React from 'react';
import PropTypes from 'prop-types';
import PlatformApplicationSelectInput from "components/common/list_of_values_input/platform/PlatformApplicationSelectInput";

function PlatformInventoryPlatformApplicationSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("applicationId", selectedOption?._id, "");
    newModel.setData("toolsList", selectedOption?.tools, []);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    const newModel = {...model};
    newModel.setDefaultValue("applicationId");
    newModel.setDefaultValue("toolsList");
    setModel({...newModel});
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

