import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const snykConnectivityTypeArray = [
  {
    name: "Snyk CLI",
    value: "Snyk CLI",
  },
];

export default function SnykConnectivityTypeSelectInput({fieldName, model, setModel, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption?.value);    
    setModel({ ...newModel });
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykConnectivityTypeArray}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

SnykConnectivityTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SnykConnectivityTypeSelectInput.defaultProps = {
  fieldName: "connectivityType"
};