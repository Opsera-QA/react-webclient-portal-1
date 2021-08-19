import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function AwsLambdaActionSelectInput({dataObject, setDataObject, isLoading, disabled}) {

  const ACTION_LIST = [
    {
      name: "Create",
      value: "create",
    },
    // {
    //   name: "Update",
    //   value: "update",
    // }
  ];

  const setDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("lambdaAction", value.value);
    setDataObject({ ...newDataObject });
  };

  return (

    <SelectInputBase
      fieldName={"lambdaAction"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Action"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

AwsLambdaActionSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default AwsLambdaActionSelectInput;