import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";


export const MIGRATION_TYPES = {
  MIGRATION_FROM_ORG_TO_CSV: "ORG_TO_FILE",
  MIGRATION_FROM_CSV_TO_ORG: "FILE_TO_ORG",
  MIGRATION_FROM_ORG_TO_ORG: "ORG_TO_ORG",
};

export const MIGRATION_TYPE_LABELS = {
  MIGRATION_FROM_ORG_TO_CSV: "Migration from Org to CSV",
  MIGRATION_FROM_CSV_TO_ORG: "Migration from CSV to Org",
  MIGRATION_FROM_ORG_TO_ORG: "Migration from Org to Org",
};

export const getMigrationTypeLabel = (taskType) => {
  switch (taskType) {
    case MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV:
      return MIGRATION_TYPE_LABELS.MIGRATION_FROM_ORG_TO_CSV;
    case MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG:
      return MIGRATION_TYPE_LABELS.MIGRATION_FROM_CSV_TO_ORG;
    case MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_ORG:
      return MIGRATION_TYPE_LABELS.MIGRATION_FROM_ORG_TO_ORG;
    default:
      return taskType;
  }
};

export const migrationTypes = [
  {text: MIGRATION_TYPE_LABELS.MIGRATION_FROM_ORG_TO_CSV, value: MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV},
  // {text: MIGRATION_TYPE_LABELS.MIGRATION_FROM_CSV_TO_ORG, value: MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG},
  {text: MIGRATION_TYPE_LABELS.MIGRATION_FROM_ORG_TO_ORG, value: MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_ORG}
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