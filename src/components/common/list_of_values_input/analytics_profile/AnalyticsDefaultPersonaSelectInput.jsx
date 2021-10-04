import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const DEFAULT_PERSONAS = [
  {
    text: "Developer",
    value: "developer",
  },
  {
    text: "Manager",
    value: "manager",
  },
  {
    text: "Executive",
    value: "executive",
  },
];

function AnalyticsDefaultPersonaSelectInput({ fieldName, model, setModel, setDataFunction, clearDataFunction, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={DEFAULT_PERSONAS}
        setDataFunction={setDataFunction}
        valueField={"value"}
        textField={"text"}
        clearDataFunction={clearDataFunction}
        // placeholderText={placeholderText}
        disabled={disabled}
      />
    </div>
  );
}

AnalyticsDefaultPersonaSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default AnalyticsDefaultPersonaSelectInput;