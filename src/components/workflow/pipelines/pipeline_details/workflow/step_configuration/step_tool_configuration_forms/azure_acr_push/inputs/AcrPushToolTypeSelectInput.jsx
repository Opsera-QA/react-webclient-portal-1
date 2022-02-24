import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function AcrPushToolTypeSelectInput({ dataObject, setDataObject, isLoading, disabled }) {
  const ACTION_LIST = [
    {
      name: "Azure V2",
      value: "azure",
    },
    {
      name: "Azure Legacy",
      value: "azure_account",
    },
  ];

  const setDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("toolType", value.value);
    setDataObject({ ...newDataObject });
  };

  return (
    <SelectInputBase
      fieldName={"toolType"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Azure Tool Type"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

AcrPushToolTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default AcrPushToolTypeSelectInput;
