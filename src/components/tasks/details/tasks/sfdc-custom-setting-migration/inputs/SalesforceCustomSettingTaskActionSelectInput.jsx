import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { MIGRATION_TYPES } from "./SalesforceCustomSettingTaskTypeSelectInput";

export const actionTypes = [
  {text: "Insert", value: "Insert"},
  {text: "Update", value: "Update"},
  {text: "Upsert", value: "Upsert"},
  {text: "Delete", value: "Delete"}
];
export const nonDeleteActionTypes = [
  {text: "Insert", value: "Insert"},
  {text: "Update", value: "Update"},
  {text: "Upsert", value: "Upsert"},
];

function SalesforceCustomSettingTaskActionSelectInput({ fieldName, model, setModel, placeholderText, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={
        model?.getData("taskType") === MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG
          ? nonDeleteActionTypes
          : actionTypes
      }
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