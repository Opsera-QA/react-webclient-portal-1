import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const actionTypes = [
  {text: "Insert", value: "Insert"},
  {text: "Update", value: "Update"},
  {text: "Upsert", value: "Upsert"},
  {text: "Delete", value: "Delete"}
];

function SalesforceCustomSettingTaskActionSelectInput({ fieldName, model, setModel, placeholderText, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={actionTypes}
      placeholderText={placeholderText}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

SalesforceCustomSettingTaskActionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  placeholderText: PropTypes.string,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforceCustomSettingTaskActionSelectInput.defaultProps = {
  fieldName: "action",
  placeholderText: "Select One",
};

export default SalesforceCustomSettingTaskActionSelectInput;