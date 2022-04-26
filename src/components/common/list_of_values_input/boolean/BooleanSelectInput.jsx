import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const classificationTypes = [
  {text: "True", value: true},
  {text: "False", value: false}
];

function BooleanSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={classificationTypes}
        valueField={"value"}
        textField={"text"}
        disabled={disabled}
        setDataFunction={setDataFunction}
      />
    </div>
  );
}

BooleanSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BooleanSelectInput;