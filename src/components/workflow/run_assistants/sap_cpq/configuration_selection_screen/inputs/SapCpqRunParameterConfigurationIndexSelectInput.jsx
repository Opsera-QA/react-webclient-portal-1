import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SapCpqRunParameterConfigurationIndexSelectInput = ({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  configurations,
}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    const index = configurations.indexOf(selectedOption);

    if (typeof index === "number" && index >= 0) {
      sapCpqRunParametersModel.setData(fieldName, index);
      setSapCpqRunParametersModel({ ...sapCpqRunParametersModel });
    }
  };

  const getCurrentValue = () => {
    const selectedConfigurationIndex = sapCpqRunParametersModel?.getData(
      "selectedConfigurationIndex",
    );

    if (
      typeof selectedConfigurationIndex === "number" &&
      selectedConfigurationIndex >= 0
    ) {
      return configurations[selectedConfigurationIndex];
    }
  };

  return (
    <SelectInputBase
      selectOptions={sapCpqRunParametersModel?.getData("configurations")}
      textField={"name"}
      fieldName={"selectedConfigurationIndex"}
      dataObject={sapCpqRunParametersModel}
      setDataObject={setSapCpqRunParametersModel}
      setDataFunction={setDataFunction}
      getCurrentValue={getCurrentValue}
    />
  );
};

SapCpqRunParameterConfigurationIndexSelectInput.propTypes = {
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
  configurations: PropTypes.array,
};

export default SapCpqRunParameterConfigurationIndexSelectInput;
