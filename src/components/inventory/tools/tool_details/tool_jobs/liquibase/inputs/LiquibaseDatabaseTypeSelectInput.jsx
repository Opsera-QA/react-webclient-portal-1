import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const DB_TYPES = [
  { name: "Snowflake", value: "snowflake" },
  { name: "Oracle", value: "oracle"},
];

function LiquibaseDatabaseTypeSelectInput({ fieldName, model, setModel, disabled, textField, valueField }) {

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={DB_TYPES}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

LiquibaseDatabaseTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

LiquibaseDatabaseTypeSelectInput.defaultProps = {
  fieldName: "buildType",
  valueField: "value",
  textField: "name"
};

export default LiquibaseDatabaseTypeSelectInput;
