import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const classificationTypes = ["TRUE","FALSE"];

function CustomSettingBooleanQuerySelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    showLabel,
  }) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        showLabel={showLabel}
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

CustomSettingBooleanQuerySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
};

export default CustomSettingBooleanQuerySelectInput;