import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const migrationTypes = [
  {text: "Migration from Org to CSV", value: "ORG_TO_FILE"},
  {text: "Migration from CSV to Org", value: "FILE_TO_ORG"},
  {text: "Migration from Org to Org", value: "ORG_TO_ORG"}
];

function SalesforceCustomSettingTaskTypeSelectInput({ fieldName, model, setModel, placeholderText, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={migrationTypes}
      placeholderText={placeholderText}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

SalesforceCustomSettingTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  placeholderText: PropTypes.string,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforceCustomSettingTaskTypeSelectInput.defaultProps = {
  fieldName: "taskType",
  placeholderText: "Select One",
};

export default SalesforceCustomSettingTaskTypeSelectInput;