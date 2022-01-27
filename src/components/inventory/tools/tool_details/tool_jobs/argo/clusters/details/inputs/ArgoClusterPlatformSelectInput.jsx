import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const PLATFORM_IDENTIFIERS = [
  {
    name: "AWS",
    value: "aws",
  },
  {
    name: "Azure",
    value: "azure",
  }
];

function ArgoClusterPlatformSelectInput({model, setModel, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.value);
    newModel.setData("clusterName", "");
    newModel.setData("platformToolId", "");
    newModel.setData("resourceGroup", "");
    newModel.setData("azureApplicationId", "");    
    newModel.setData("clientId", "");
    newModel.setData("clientSecret", "");
    setModel({...newModel});    
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("platform", "");
    newModel.setData("clusterName", "");
    newModel.setData("platformToolId", "");
    newModel.setData("resourceGroup", "");
    newModel.setData("azureApplicationId", "");
    newModel.setData("clientId", "");
    newModel.setData("clientSecret", "");
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      setDataObject={setModel}
      textField={"name"}
      valueField={"value"}
      dataObject={model}
      selectOptions={PLATFORM_IDENTIFIERS}
      fieldName={"platform"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

ArgoClusterPlatformSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoClusterPlatformSelectInput;