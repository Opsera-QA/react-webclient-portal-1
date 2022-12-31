import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const ApigeeRunParameterConfigurationIndexSelectInput = (
  {
    apigeeRunParametersModel,
    setApigeeRunParametersModel,
    configurations,
  }) => {
  const setDataFunction = (fieldName, selectedOption) => {
    const index = configurations.indexOf(selectedOption);

    if (typeof index === "number" && index >= 0) {
      apigeeRunParametersModel.setData(fieldName, index);
      setApigeeRunParametersModel({...apigeeRunParametersModel});
    }
  };

  const getCurrentValue = () => {
    const selectedConfigurationIndex = apigeeRunParametersModel?.getData("selectedConfigurationIndex");

    if (typeof selectedConfigurationIndex === "number" && selectedConfigurationIndex >= 0) {
      return configurations[selectedConfigurationIndex];
    }
  };

  return (
    <SelectInputBase
      selectOptions={apigeeRunParametersModel?.getData("configurations")}
      textField={"name"}
      fieldName={"selectedConfigurationIndex"}
      dataObject={apigeeRunParametersModel}
      setDataObject={setApigeeRunParametersModel}
      setDataFunction={setDataFunction}
      getCurrentValue={getCurrentValue}
    />
  );
};

ApigeeRunParameterConfigurationIndexSelectInput.propTypes = {
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  configurations: PropTypes.array,
};

export default ApigeeRunParameterConfigurationIndexSelectInput;
