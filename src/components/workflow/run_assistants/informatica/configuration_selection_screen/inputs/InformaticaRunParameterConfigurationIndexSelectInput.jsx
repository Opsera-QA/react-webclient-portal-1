import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const InformaticaRunParameterConfigurationIndexSelectInput = (
  {
    informaticaRunParametersModel,
    setInformaticaRunParametersModel,
    configurations,
  }) => {
  const setDataFunction = (fieldName, selectedOption) => {
    const index = configurations.indexOf(selectedOption);

    if (typeof index === "number" && index >= 0) {
      informaticaRunParametersModel.setData(fieldName, index);
      setInformaticaRunParametersModel({...informaticaRunParametersModel});
    }
  };

  const getCurrentValue = () => {
    const selectedConfigurationIndex = informaticaRunParametersModel?.getData("selectedConfigurationIndex");

    if (typeof selectedConfigurationIndex === "number" && selectedConfigurationIndex >= 0) {
      return configurations[selectedConfigurationIndex];
    }
  };

  return (
    <SelectInputBase
      selectOptions={informaticaRunParametersModel?.getData("configurations")}
      textField={"name"}
      fieldName={"selectedConfigurationIndex"}
      dataObject={informaticaRunParametersModel}
      setDataObject={setInformaticaRunParametersModel}
      setDataFunction={setDataFunction}
      getCurrentValue={getCurrentValue}
    />
  );
};

InformaticaRunParameterConfigurationIndexSelectInput.propTypes = {
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  configurations: PropTypes.array,
};

export default InformaticaRunParameterConfigurationIndexSelectInput;
